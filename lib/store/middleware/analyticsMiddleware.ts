import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface AnalyticsEvent {
  type: string;
  timestamp: number;
  userId?: string;
  data?: any;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 30000; // 30 seconds
  private flushInterval: NodeJS.Timeout;

  constructor() {
    this.flushInterval = setInterval(() => this.flush(), this.FLUSH_INTERVAL);
  }

  track(event: Omit<AnalyticsEvent, "timestamp">) {
    this.events.push({
      ...event,
      timestamp: Date.now(),
    });

    if (this.events.length >= this.BATCH_SIZE) {
      this.flush();
    }
  }

  private async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventsToSend),
      });
    } catch (error) {
      console.error("Failed to send analytics:", error);
      // Retry failed events
      this.events = [...eventsToSend, ...this.events];
    }
  }

  destroy() {
    clearInterval(this.flushInterval);
    this.flush();
  }
}

const analytics = new Analytics();

export const analyticsMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  // Track specific actions
  if (action.type.startsWith("auth/")) {
    analytics.track({
      type: "auth_action",
      userId: (window as any).store.getState().auth.user?.id,
      data: {
        action: action.type,
        success: !action.type.includes("rejected"),
      },
    });
  }

  if (action.type.startsWith("projects/")) {
    analytics.track({
      type: "project_action",
      userId: (window as any).store.getState().auth.user?.id,
      data: {
        action: action.type,
        projectId: action.meta?.arg?.id,
        success: !action.type.includes("rejected"),
      },
    });
  }

  if (action.type.startsWith("files/")) {
    analytics.track({
      type: "file_action",
      userId: (window as any).store.getState().auth.user?.id,
      data: {
        action: action.type,
        fileId: action.meta?.arg?.fileId,
        success: !action.type.includes("rejected"),
      },
    });
  }

  // Track UI interactions
  if (action.type.startsWith("ui/")) {
    analytics.track({
      type: "ui_interaction",
      userId: (window as any).store.getState().auth.user?.id,
      data: {
        action: action.type,
        component: action.payload?.component,
      },
    });
  }

  return result;
};

// Cleanup analytics on app unmount
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    analytics.destroy();
  });
}
