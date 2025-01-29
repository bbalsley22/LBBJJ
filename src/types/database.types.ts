export interface Database {
  public: {
    Tables: {
      members: {
        Row: Member;
        Insert: Omit<Member, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Member, 'id'>>;
      };
      membership_history: {
        Row: MembershipHistory;
        Insert: Omit<MembershipHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<MembershipHistory, 'id' | 'created_at'>>;
      };
      check_ins: {
        Row: CheckIn;
        Insert: Omit<CheckIn, 'id' | 'created_at'>;
        Update: Partial<Omit<CheckIn, 'id' | 'created_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export interface Member {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  emergency_contact?: string;
  membership_type: 'standard' | 'premium' | 'staff';
  membership_status: 'active' | 'inactive' | 'suspended';
  belt_rank?: string;
  created_at: string;
  updated_at: string;
  last_check_in?: string;
}

export interface MembershipHistory {
  id: string;
  member_id: string;
  action: string;
  previous_status?: string;
  new_status?: string;
  created_at: string;
}

export interface CheckIn {
  id: string;
  member_id: string;
  check_in_time: string;
  check_out_time?: string;
  created_at: string;
}