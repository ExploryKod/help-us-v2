"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from 'antd';
import { CheckCircle } from 'lucide-react';

export function AuthorizeButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleAuthorize = async () => {
    if (!session?.user?._id.toString()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/authorize/${session.user._id.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du rôle');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
        type={"primary"}
      onClick={handleAuthorize}
      disabled={!session?.user?._id || loading}
      className="bg-hu-tertiary text-white hover:opacity-75 p-2"
    >
      {loading ? (
        <>
          <CheckCircle className="animate-spin text-white" />
          <span>Mise à jour...</span>
        </>
      ) : (
        <>
          <span>Devenir un admin</span>
        </>
      )}
    </Button>
  );
}