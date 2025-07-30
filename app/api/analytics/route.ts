import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface DeviceInfo {
  type: string;
  os: string;
  browser: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface ScreenInfo {
  width?: number;
  height?: number;
  availWidth?: number;
  availHeight?: number;
}

interface ViewportInfo {
  width?: number;
  height?: number;
}

interface LocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

interface PageInfo {
  url?: string;
  title?: string;
  path?: string;
}

interface PerformanceInfo {
  [key: string]: unknown;
}

interface ConnectionInfo {
  [key: string]: unknown;
}

interface VisitorData {
  id: number;
  timestamp: string;
  ip: string;
  device: DeviceInfo;
  userAgent: string;
  screen: ScreenInfo;
  viewport: ViewportInfo;
  colorDepth: number | undefined;
  pixelRatio: number | undefined;
  language: string | undefined;
  languages: string[] | undefined;
  timezone: string | undefined;
  timezoneOffset: number | undefined;
  location: LocationData | null;
  page: PageInfo;
  referrer: string | undefined;
  cookiesEnabled: boolean | undefined;
  onlineStatus: boolean | undefined;
  doNotTrack: string | undefined;
  performance: PerformanceInfo;
  sessionId: string | undefined;
  isReturningVisitor: boolean | undefined;
  visitCount: number;
  acceptLanguage: string | null;
  acceptEncoding: string | null;
  connection: ConnectionInfo;
}

// In-memory storage (in production, use a database)
const visitorData: VisitorData[] = [];

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.ip || 
               'unknown';
    
    // Get user agent for device info
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Parse user agent for device details
    const getDeviceInfo = (ua: string): DeviceInfo => {
      const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
      const isTablet = /iPad|Android.*Tablet/i.test(ua);
      const isDesktop = !isMobile && !isTablet;
      
      let os = 'Unknown';
      if (/Windows/i.test(ua)) os = 'Windows';
      else if (/Mac OS/i.test(ua)) os = 'macOS';
      else if (/Linux/i.test(ua)) os = 'Linux';
      else if (/Android/i.test(ua)) os = 'Android';
      else if (/iOS|iPhone|iPad/i.test(ua)) os = 'iOS';
      
      let browser = 'Unknown';
      if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) browser = 'Chrome';
      else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
      else if (/Firefox/i.test(ua)) browser = 'Firefox';
      else if (/Edge/i.test(ua)) browser = 'Edge';
      
      return {
        type: isDesktop ? 'Desktop' : isTablet ? 'Tablet' : 'Mobile',
        os,
        browser,
        isMobile,
        isTablet,
        isDesktop
      };
    };
    
    // Get geolocation data from IP (using free service)
    let geoData = null;
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
      }
    } catch (error) {
      console.error('Geolocation fetch error:', error);
    }
    
    const body = await request.json();
    const deviceInfo = getDeviceInfo(userAgent);
    
    // Compile all visitor data
    const visitor: VisitorData = {
      // Basic Info
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      ip: ip,
      
      // Device Information
      device: deviceInfo,
      userAgent: userAgent,
      
      // Screen & Browser Info (from client)
      screen: body.screen || {},
      viewport: body.viewport || {},
      colorDepth: body.colorDepth,
      pixelRatio: body.pixelRatio,
      language: body.language,
      languages: body.languages,
      timezone: body.timezone,
      timezoneOffset: body.timezoneOffset,
      
      // Location Data
      location: geoData ? {
        country: geoData.country,
        countryCode: geoData.countryCode,
        region: geoData.regionName,
        city: geoData.city,
        zip: geoData.zip,
        lat: geoData.lat,
        lon: geoData.lon,
        timezone: geoData.timezone,
        isp: geoData.isp,
        org: geoData.org,
        as: geoData.as
      } : null,
      
      // Page Information
      page: body.page || {},
      referrer: body.referrer,
      
      // Technical Details
      cookiesEnabled: body.cookiesEnabled,
      onlineStatus: body.onlineStatus,
      doNotTrack: body.doNotTrack,
      
      // Performance Metrics
      performance: body.performance || {},
      
      // Session Info
      sessionId: body.sessionId,
      isReturningVisitor: body.isReturningVisitor,
      visitCount: body.visitCount || 1,
      
      // Headers
      acceptLanguage: request.headers.get('accept-language'),
      acceptEncoding: request.headers.get('accept-encoding'),
      
      // Connection Info
      connection: body.connection || {}
    };
    
    // Store visitor data
    visitorData.push(visitor);
    
    // Keep only last 1000 entries in memory
    if (visitorData.length > 1000) {
      visitorData.shift();
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Visitor data recorded',
      visitorId: visitor.id 
    });
    
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to record analytics' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics data (protected in production)
export async function GET() {
  // In production, add authentication here
  return NextResponse.json({
    totalVisitors: visitorData.length,
    visitors: visitorData.slice(-100), // Last 100 visitors
    summary: {
      devices: {
        mobile: visitorData.filter(v => v.device.isMobile).length,
        tablet: visitorData.filter(v => v.device.isTablet).length,
        desktop: visitorData.filter(v => v.device.isDesktop).length
      },
      browsers: visitorData.reduce((acc, v) => {
        acc[v.device.browser] = (acc[v.device.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      countries: visitorData.reduce((acc, v) => {
        if (v.location?.country) {
          acc[v.location.country] = (acc[v.location.country] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    }
  });
}