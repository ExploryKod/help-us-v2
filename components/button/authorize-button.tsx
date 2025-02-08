import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
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
      console.log('Utilisateur mis à jour:', data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };
console.log('session', session?.user._id)
  return (
    <Button
      onClick={handleAuthorize}
      disabled={!session?.user?._id || loading}
      className="gap-2"
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