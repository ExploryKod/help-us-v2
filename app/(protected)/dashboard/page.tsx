"use client";

import { useEffect, useState } from "react";
import { getDonations } from "@/lib/actions/donations.actions";
import { getBeneficiaries } from "@/lib/actions/beneficiaries.actions";
import { getDonors } from "@/lib/actions/donors.actions";
import { Card, Col, Empty, Row, Typography, Spin, Button, Tooltip } from "antd";
import { IDonation } from "@/types/IDonnation";
import { IBeneficiary } from "@/types/IBeneficiary";
import { IDonor } from "@/types/IDonor";
import StatsCard from "@/components/ui/StatsCard";
import { Users, Heart, Wallet, TrendingUp, ArrowRightToLine } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

const Page = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<IBeneficiary[]>([]);
  const [donors, setDonors] = useState<IDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fetchedDonations,
          fetchedBeneficiaries,
          fetchedDonors
        ] = await Promise.all([
          getDonations(),
          getBeneficiaries(),
          getDonors()
        ]);
        
        setDonations(fetchedDonations);
        setBeneficiaries(fetchedBeneficiaries);
        setDonors(fetchedDonors);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalDonationAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const averageDonationAmount = donations.length > 0 
    ? totalDonationAmount / donations.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Statistics Section with Title */}
      <div className="mb-8">
        <Title level={4} className="mb-6">
          Vue d'ensemble
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Bénéficiaires"
              value={beneficiaries.length}
              description="Bénéficiaires actifs"
              link="/beneficiaries"
              icon={<Users />}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Donateurs"
              value={donors.length}
              description="Donateurs enregistrés"
              link="/donors"
              icon={<Heart />}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Donations"
              value={donations.length}
              description="Nombre total de dons"
              link="/donations"
              icon={<Wallet />}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatsCard
              title="Montant Total"
              value={`${totalDonationAmount}€`}
              description={`Moyenne: ${averageDonationAmount.toFixed(2)}€`}
              link="/donations"
              icon={<TrendingUp />}
            />
          </Col>
        </Row>
      </div>

      <Card 
        title={
          <div className="flex items-center justify-between">
            <Title level={4} className="!mb-0">Donations Récentes</Title>
            <Link href="/donations">
              <Button 
                type="link" 
                className="text-hu-primary hover:text-hu-primary/80"
              >
                Voir tout
                <ArrowRightToLine className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
        className="shadow-sm"
      >
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : donations.length > 0 ? (
          <Row gutter={[16, 16]}>
            {donations.slice(0, 3).map((donation) => (
              <Col 
                key={donation._id.toString()} 
                xs={24} 
                md={8}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-hu-primary"
                  onClick={() => router.push(`/donations/${donation._id}`)}
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Title level={4} className="!mb-0 !mt-2" style={{ color: '#3D52A0' }}>
                        {donation.amount}€
                      </Title>
                    </div>
                    <Tooltip 
                      title={new Date(donation.date).toLocaleString('fr-FR')}
                    >
                      <Text type="secondary" className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                        {formatDistanceToNow(new Date(donation.date), { 
                          addSuffix: true,
                          locale: fr 
                        })}
                      </Text>
                    </Tooltip>
                  </div>
                  
                  <div className="mt-4 space-y-2 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="text-xs">Donateur</Text>
                      <Text style={{ color: '#3D52A0' }} className="text-sm font-medium">
                        {donation.donorId?.name || 'N/A'}
                      </Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="text-xs">Bénéficiaire</Text>
                      <Text style={{ color: '#3D52A0' }} className="text-sm font-medium">
                        {donation.beneficiaryId?.name || 'N/A'}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description="Aucune donation trouvée" 
            className="py-8"
          />
        )}
      </Card>
    </div>
  );
};

export default Page;
