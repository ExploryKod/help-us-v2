import { Card, Typography } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  link: string;
  icon?: React.ReactNode;
}

const StatsCard = ({ title, value, description, link, icon }: StatsCardProps) => {
  return (
    <Link href={link}>
      <Card 
        hoverable 
        className="text-center bg-white transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-center justify-center mb-4">
          {icon && <div className="text-hu-tertiary text-2xl">{icon}</div>}
        </div>
        <Title level={3} className="!mb-1">{value}</Title>
        <Title level={5} className="!mt-0 !mb-2">{title}</Title>
        {description && (
          <Text type="secondary" className="block">
            {description}
          </Text>
        )}
      </Card>
    </Link>
  );
};

export default StatsCard; 