'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // Track page views
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      // Enhanced measurement
      send_page_view: true,
      // Additional user data
      user_properties: {
        visitor_type: localStorage.getItem('returning_visitor') ? 'returning' : 'new',
        visit_count: parseInt(localStorage.getItem('visit_count') || '0') + 1,
      }
    });

    // Custom event for detailed tracking
    window.gtag('event', 'page_view_detailed', {
      page_location: window.location.href,
      page_referrer: document.referrer,
      page_title: document.title,
      // Device information
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      color_depth: window.screen.colorDepth,
      pixel_ratio: window.devicePixelRatio,
      // Browser information
      user_language: navigator.language,
      user_languages: navigator.languages?.join(','),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezone_offset: new Date().getTimezoneOffset(),
      // Connection information
      connection_type: ((navigator as any).connection as any)?.effectiveType,
      connection_speed: ((navigator as any).connection as any)?.downlink,
      // Technical details
      cookies_enabled: navigator.cookieEnabled,
      online_status: navigator.onLine,
      do_not_track: navigator.doNotTrack,
      // Performance metrics
      page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart,
      dom_load_time: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
          window.gtag('event', 'scroll', {
            percent_scrolled: scrollPercent,
            page_location: window.location.href,
          });
        }
      }
    };
    window.addEventListener('scroll', trackScroll);

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      window.gtag('event', 'time_on_page', {
        time_seconds: timeOnPage,
        page_location: window.location.href,
      });
    };
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Update visit tracking in localStorage
    localStorage.setItem('returning_visitor', 'true');
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
    localStorage.setItem('visit_count', (visitCount + 1).toString());

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              // Enhanced measurement settings
              page_view: true,
              scroll: true,
              outbound_click: true,
              site_search: true,
              video_engagement: true,
              file_download: true,
              
              // Additional configuration
              send_page_view: true,
              anonymize_ip: false, // Set to true for GDPR compliance
              
              // Custom dimensions
              custom_map: {
                'dimension1': 'visitor_type',
                'dimension2': 'device_category',
                'dimension3': 'connection_type'
              }
            });

            // Track additional visitor info
            gtag('event', 'visitor_info', {
              // Browser capabilities
              webgl_support: !!document.createElement('canvas').getContext('webgl'),
              service_worker_support: 'serviceWorker' in navigator,
              notification_support: 'Notification' in window,
              
              // Device memory (if available)
              device_memory: (navigator as any).deviceMemory,
              hardware_concurrency: navigator.hardwareConcurrency,
              
              // Storage
              local_storage_available: typeof(Storage) !== 'undefined',
              session_storage_available: 'sessionStorage' in window,
              
              // Media capabilities
              touch_support: 'ontouchstart' in window,
              
              // Battery info (if available)
              battery_level: (navigator as any).getBattery ? 'supported' : 'not_supported'
            });
          `,
        }}
      />
    </>
  );
}