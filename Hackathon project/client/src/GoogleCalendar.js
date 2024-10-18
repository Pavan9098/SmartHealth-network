import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import "./GoogleCalendar.css";

function GoogleCalendar() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    if (!eventName || !eventDescription) {
      alert("Event name and description are required");
      return;
    }

    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    try {
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + session.provider_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      console.log(data);
      alert("Event created, check your Google Calendar!");
    } catch (error) {
      console.error("Error creating calendar event", error);
      alert("Error creating calendar event");
    }
  }

  return (
    <div className="App">
      <div className="form-container">
        {session ?
          <>
            <h2>Hey there {session.user.email}</h2>
            <div className="input-group">
              <label>Start of your event</label>
              <DateTimePicker onChange={setStart} value={start} className="date-time-picker" />
            </div>
            <div className="input-group">
              <label>End of your event</label>
              <DateTimePicker onChange={setEnd} value={end} className="date-time-picker" />
            </div>
            <div className="input-group">
              <label>Event name</label>
              <input type="text" onChange={(e) => setEventName(e.target.value)} value={eventName} />
            </div>
            <div className="input-group">
              <label>Event description</label>
              <input type="text" onChange={(e) => setEventDescription(e.target.value)} value={eventDescription} />
            </div>
            <hr />
            <button onClick={createCalendarEvent}>Create Calendar Event</button>
            <p></p>
            <button onClick={signOut}>Sign Out</button>
          </>
          :
          <>
            <button onClick={googleSignIn}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default GoogleCalendar;
