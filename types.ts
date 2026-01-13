export interface Vendor {
  id: string;
  name: string;
  tag: string;
  transitVendors: string[];
  warehouseIds: string[];
  status: 'ENABLED' | 'DISABLED';
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  count?: number;
}

export type PageType = 'CONFIG' | 'PERFORMANCE' | 'ROUTING';

export interface PerformanceMetric {
  vendorId: string;
  vendorName: string;
  outboundOtp: number; // Percentage
  inboundOtp: number; // Percentage
  avgProcessingTime: number; // Hours
  returnTat: number; // Hours
  backlog: number; // Order count
  status: 'Healthy' | 'Warning' | 'Critical';
}

// Existing Data Model Structure provided by user
export interface AllocationRule {
  id: string; // Artificial ID for UI
  partner: string;
  city_id: string;
  group_service: string;
  enabled: boolean;
  index: number; // Static priority
  seller?: string;
  seller_name?: string;
  type?: string;
  vendor_id: string;
  weight?: {
    from?: number;
    to?: number;
  };
}

export interface RoutingConfig {
  weightOtp: number;      // Importance of On-Time Performance (0-10)
  weightBacklog: number;  // Importance of avoiding Backlog (0-10)
  weightStatic: number;   // Importance of static 'index' (0-10)
  backlogThreshold: number; // Circuit breaker limit
}