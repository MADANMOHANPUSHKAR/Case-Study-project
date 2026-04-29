CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'gym' or 'pool'
  max_capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS facility_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID REFERENCES facilities(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' -- 'active', 'cancelled', 'checked_in'
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  capacity INTEGER NOT NULL,
  is_workshop BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered' -- 'registered', 'attended'
);
