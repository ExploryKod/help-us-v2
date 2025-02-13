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
        className="text-center bg-white transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="flex flex-col items-center gap-3">
          {icon && <div className="text-hu-tertiary">{icon}</div>}
          <div>
            <Title level={3} className="!mb-1 text-2xl md:text-3xl">{value}</Title>
            <Title level={5} className="!mt-0 !mb-2 text-base md:text-lg">{title}</Title>
            {description && (
              <Text type="secondary" className="block text-sm md:text-base">
                {description}
              </Text>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StatsCard; 