export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: Table<{
        id: string; full_name: string; role: "admin"; created_at: string;
      }, {
        id: string; full_name: string; role?: "admin"; created_at?: string;
      }>;
      customers: Table<{
        id: string; phone: string; full_name: string; blocked: boolean; created_at: string;
      }, {
        id?: string; phone: string; full_name: string; blocked?: boolean; created_at?: string;
      }>;
      staff: Table<{
        id: string; name: string; photo_path: string | null; bio: string | null; active: boolean; created_at: string;
      }, {
        id?: string; name: string; photo_path?: string | null; bio?: string | null; active?: boolean; created_at?: string;
      }>;
      service_categories: Table<{
        id: string; name: string; tagline: string | null; image_path: string | null;
        sort_order: number; active: boolean; created_at: string;
      }, {
        id?: string; name: string; tagline?: string | null; image_path?: string | null;
        sort_order?: number; active?: boolean; created_at?: string;
      }>;
      services: Table<{
        id: string; category_id: string; name: string; description: string | null;
        image_path: string | null; price: number; duration_minutes: number;
        payment_mode: "deposit" | "pay_at_shop"; deposit_amount: number; active: boolean; created_at: string;
      }, {
        id?: string; category_id: string; name: string; description?: string | null;
        image_path?: string | null; price: number; duration_minutes: number;
        payment_mode?: "deposit" | "pay_at_shop"; deposit_amount?: number;
        active?: boolean; created_at?: string;
      }>;
      service_staff: Table<{ service_id: string; staff_id: string }, {
        service_id: string; staff_id: string;
      }>;
      staff_hours: Table<{
        id: string; staff_id: string; weekday: number; starts_at: string; ends_at: string;
      }, {
        id?: string; staff_id: string; weekday: number; starts_at: string; ends_at: string;
      }>;
      staff_time_off: Table<{
        id: string; staff_id: string; starts_at: string; ends_at: string; reason: string | null;
      }, {
        id?: string; staff_id: string; starts_at: string; ends_at: string; reason?: string | null;
      }>;
      bookings: Table<{
        id: string; code: string; public_token: string; customer_id: string; customer_name: string;
        service_id: string; staff_id: string; starts_at: string; ends_at: string;
        status: "pending_payment" | "confirmed" | "checked_in" | "expired" | "cancelled" | "no_show";
        source: "web" | "pos"; total_price: number; deposit_due: number; hold_expires_at: string | null;
        checked_in_at: string | null; sms_status: "not_sent" | "pending" | "sent" | "failed"; created_at: string;
      }, {
        id?: string; code?: string; public_token?: string; customer_id: string; customer_name: string;
        service_id: string; staff_id: string; starts_at: string; ends_at: string;
        status?: "pending_payment" | "confirmed" | "checked_in" | "expired" | "cancelled" | "no_show";
        source?: "web" | "pos"; total_price: number; deposit_due?: number;
        hold_expires_at?: string | null; checked_in_at?: string | null;
        sms_status?: "not_sent" | "pending" | "sent" | "failed"; created_at?: string;
      }>;
      payments: Table<{
        id: string; booking_id: string; kind: "deposit" | "balance" | "full";
        method: "paystack" | "cash" | "momo" | "card"; amount: number;
        status: "pending" | "paid" | "failed" | "refunded"; reference: string;
        paid_at: string | null; created_at: string;
      }, {
        id?: string; booking_id: string; kind: "deposit" | "balance" | "full";
        method: "paystack" | "cash" | "momo" | "card"; amount: number; status?: "pending" | "paid" | "failed" | "refunded";
        reference: string; paid_at?: string | null; created_at?: string;
      }>;
      offers: Table<{
        id: string; title: string; description: string | null; image_path: string | null;
        active: boolean; starts_on: string | null; ends_on: string | null; service_id: string | null; created_at: string;
      }, {
        id?: string; title: string; description?: string | null; image_path?: string | null;
        active?: boolean; starts_on?: string | null; ends_on?: string | null;
        service_id?: string | null; created_at?: string;
      }>;
      gallery_images: Table<{
        id: string; path: string; caption: string | null; sort_order: number; active: boolean; created_at: string;
      }, {
        id?: string; path: string; caption?: string | null; sort_order?: number;
        active?: boolean; created_at?: string;
      }>;
      rate_limits: Table<{
        id: string; key: string; window_started_at: string; count: number;
      }, {
        id?: string; key: string; window_started_at: string; count?: number;
      }>;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      payment_mode: "deposit" | "pay_at_shop";
      booking_status: "pending_payment" | "confirmed" | "checked_in" | "expired" | "cancelled" | "no_show";
      booking_source: "web" | "pos";
      payment_kind: "deposit" | "balance" | "full";
      payment_method: "paystack" | "cash" | "momo" | "card";
      payment_status: "pending" | "paid" | "failed" | "refunded";
      profile_role: "admin";
    };
    CompositeTypes: Record<string, never>;
  };
};

type Table<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown>,
> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: [];
};
