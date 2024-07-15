import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSession } from 'services/Instructor/sessionApiService';
import { message } from 'antd';

interface Session {
  _id: string;
  name: string;
  description: string;
  position_order: number;
  created_at: string;
  updated_at: string;
}

const ManagerLession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        console.error("sessionId is undefined");
        message.error('sessionId is undefined');
        return;
      }

      try {
        const response = await getSession(sessionId);
        setSession(response.data);
      } catch (error) {
        console.error("Failed to fetch session", error);
        message.error('Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div>
      <h1>Manager Lession</h1>
      <h2>{session.name}</h2>
    </div>
  );
};

export default ManagerLession;