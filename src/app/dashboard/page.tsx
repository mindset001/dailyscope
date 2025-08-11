'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUserArticles } from '@/services/article'
import {
  Users,
  FileText,
  DollarSign,
  Star,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  // other user fields...
}

interface Article {
  id: string;
  title: string;
  status: 'Active' | 'Suspended';
  // other article fields...
}

 function DashboardStats() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    try {
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      setUser(parsedUser);
    } catch (err) {
      console.error("Failed to parse user from storage:", err);
      setError("Failed to load user data");
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchMyArticles = async () => {
      setLoading(true);
      try {
        const data = await getUserArticles(user.id);
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

  // Calculate stats from articles
  const suspendedArticlesCount = articles.filter(
    article => article.status === 'Suspended'
  ).length;

  const dashboardData = [
    {
      title: 'Articles Published',
      value: articles.length,
      icon: <FileText className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Suspended Articles',
      value: suspendedArticlesCount,
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Subscription Status',
      value: 'Active',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'Subscription Due Date',
      value: '12, Sep 2024',
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
  ];

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

const userGrowthData = [
  { month: 'Jan', users: 100 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 600 },
  { month: 'Apr', users: 900 },
  { month: 'May', users: 1200 },
  { month: 'Jun', users: 1500 },
]


const topArticles = [
  { title: 'The Rise of AI in Africa', views: 1540 },
  { title: 'Top 10 Tech Hubs in Nigeria', views: 1123 },
  { title: 'How to Stay Secure Online', views: 980 },
]




  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" /> User Growth (6 months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

   
      {/* Top Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Top Viewed Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {articles.map((article, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>{article.title}</span>
                <span className="font-medium text-sm text-gray-600">{article.status || 0} views</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardStats;