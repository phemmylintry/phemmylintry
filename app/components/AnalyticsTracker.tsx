'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    // Wait for gtag to be available
    const checkAndInit = () => {
      if (typeof window === 'undefined' || !window.gtag) {
        // Try again in 100ms
        setTimeout(checkAndInit, 100);
        return;
      }

      // Track click events
      const trackClick = (e: MouseEvent) => {
        if (!window.gtag) return;
        
        const target = e.target as HTMLElement;
        const clickData = {
          element_type: target.tagName,
          element_text: target.textContent?.substring(0, 100),
          element_id: target.id,
          element_class: target.className,
          click_x: e.clientX,
          click_y: e.clientY,
          page_location: window.location.href,
        };

        // Track specific interactions
        if (target.tagName === 'A') {
          const href = (target as HTMLAnchorElement).href;
          window.gtag('event', 'link_click', {
            ...clickData,
            link_url: href,
            link_domain: new URL(href).hostname,
            outbound: !href.includes(window.location.hostname),
          });
        } else if (target.tagName === 'BUTTON') {
          window.gtag('event', 'button_click', clickData);
        }
      };

      // Track form interactions
      const trackFormInteraction = (e: Event) => {
        if (!window.gtag) return;
        
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          window.gtag('event', 'form_interaction', {
            field_name: (target as HTMLInputElement).name,
            field_type: (target as HTMLInputElement).type,
            field_id: target.id,
            page_location: window.location.href,
          });
        }
      };

      // Track copy events (when users copy text)
      const trackCopy = () => {
        if (!window.gtag) return;
        
        const selection = window.getSelection()?.toString();
        if (selection) {
          window.gtag('event', 'text_copied', {
            copied_text: selection.substring(0, 100),
            text_length: selection.length,
            page_location: window.location.href,
          });
        }
      };

      // Track visibility changes
      const trackVisibility = () => {
        if (!window.gtag) return;
        
        window.gtag('event', 'visibility_change', {
          visibility_state: document.visibilityState,
          page_location: window.location.href,
        });
      };

      // Track print events
      const trackPrint = () => {
        if (!window.gtag) return;
        
        window.gtag('event', 'page_printed', {
          page_location: window.location.href,
        });
      };

      // Track errors
      const trackError = (e: ErrorEvent) => {
        if (!window.gtag) return;
        
        window.gtag('event', 'javascript_error', {
          error_message: e.message,
          error_source: e.filename,
          error_line: e.lineno,
          error_column: e.colno,
          page_location: window.location.href,
        });
      };

      // Track page engagement
      let engagementTime = 0;
      let lastActiveTime = Date.now();
      let isActive = true;

      const trackEngagement = () => {
        if (!window.gtag) return;
        
        if (isActive) {
          engagementTime += Date.now() - lastActiveTime;
        }
        lastActiveTime = Date.now();
        
        window.gtag('event', 'user_engagement', {
          engagement_time_msec: engagementTime,
          page_location: window.location.href,
        });
      };

      const handleActivity = () => {
        if (!isActive) {
          isActive = true;
          lastActiveTime = Date.now();
        }
      };

      const handleInactivity = () => {
        if (isActive) {
          engagementTime += Date.now() - lastActiveTime;
          isActive = false;
        }
      };

      // Collect initial visitor data
      if (window.gtag) {
        window.gtag('event', 'visitor_details', {
          // Network information
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          network_type: 'connection' in navigator ? (navigator as any).connection?.type : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          network_effective_type: 'connection' in navigator ? (navigator as any).connection?.effectiveType : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          network_downlink: 'connection' in navigator ? (navigator as any).connection?.downlink : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          network_rtt: 'connection' in navigator ? (navigator as any).connection?.rtt : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          network_save_data: 'connection' in navigator ? (navigator as any).connection?.saveData : undefined,
          
          // Platform details
          platform: navigator.platform,
          vendor: navigator.vendor,
          user_agent: navigator.userAgent,
          
          // Window information
          window_width: window.innerWidth,
          window_height: window.innerHeight,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          available_width: window.screen.availWidth,
          available_height: window.screen.availHeight,
          color_depth: window.screen.colorDepth,
          pixel_depth: window.screen.pixelDepth,
          
          // Feature detection
          java_enabled: navigator.javaEnabled(),
          pdf_viewer_enabled: navigator.pdfViewerEnabled || false,
          
          // Permissions API (if available)
          permissions_api_available: 'permissions' in navigator,
        });
      }

      // Add event listeners
      document.addEventListener('click', trackClick);
      document.addEventListener('focus', trackFormInteraction, true);
      document.addEventListener('copy', trackCopy);
      document.addEventListener('visibilitychange', trackVisibility);
      window.addEventListener('beforeprint', trackPrint);
      window.addEventListener('error', trackError);
      
      // Engagement tracking
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keypress', handleActivity);
      document.addEventListener('scroll', handleActivity);
      document.addEventListener('touchstart', handleActivity);
      
      // Inactivity after 30 seconds
      const inactivityTimer = setInterval(() => {
        if (Date.now() - lastActiveTime > 30000) {
          handleInactivity();
        }
      }, 5000);
      
      // Send engagement data every 10 seconds
      const engagementInterval = setInterval(trackEngagement, 10000);

      // Cleanup function
      return () => {
        document.removeEventListener('click', trackClick);
        document.removeEventListener('focus', trackFormInteraction, true);
        document.removeEventListener('copy', trackCopy);
        document.removeEventListener('visibilitychange', trackVisibility);
        window.removeEventListener('beforeprint', trackPrint);
        window.removeEventListener('error', trackError);
        document.removeEventListener('mousemove', handleActivity);
        document.removeEventListener('keypress', handleActivity);
        document.removeEventListener('scroll', handleActivity);
        document.removeEventListener('touchstart', handleActivity);
        clearInterval(inactivityTimer);
        clearInterval(engagementInterval);
      };
    };

    // Start checking for gtag
    checkAndInit();
  }, []);

  return null;
}