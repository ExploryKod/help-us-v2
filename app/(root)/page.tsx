import { getDonations } from "@/lib/actions/donations.actions";

export default async function Home() {
  const donations = await getDonations();

  return (
    <div>
      <h1>Hi, Welcome to the Dashboard</h1>

      {donations.length > 0 ? (
        <div>
          <h2>Liste des Donations</h2>
          <ul>
            {donations.map((donation) => (
              <li key={donation._id}>
                <strong>ID:</strong> {donation._id} - 
                <strong> Montant:</strong> {donation.montant}€ - 
                <strong> Type:</strong> {donation.type}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucune donation trouvée.</p>
      )}
    </div>
  );
}
