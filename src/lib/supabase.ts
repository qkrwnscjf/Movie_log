// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 URL과 Key를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 프로젝트 어디서든 사용할 수 있도록 클라이언트를 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);