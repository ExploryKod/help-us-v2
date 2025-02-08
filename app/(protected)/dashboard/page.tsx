import { getDonations } from "@/lib/actions/donations.actions";

const Dashboard = async () => {
  const donations = await getDonations();
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Liste des Donations</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <div
            key={donation._id.toString()}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">ID:</span>
                <span className="text-sm text-gray-900">{donation._id.toString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Montant:</span>
                <span className="text-sm text-gray-900">{donation.amount}€</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span className="text-sm text-gray-900">{donation.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Date:</span>
                <span className="text-sm text-gray-900">{new Date(donation.date).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Note:</span>
                <span className="text-sm text-gray-900">{donation.grade || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {donations.length === 0 && (
        <p className="mt-6 text-center text-gray-500 italic">Aucune donation trouvée.</p>
      )}
    </div>
  )
}

export default Dashboard