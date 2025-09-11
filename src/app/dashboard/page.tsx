'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProtectedRoute from '@/lib/ProtectedRoute'
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
  _id: string;
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Article {
  id: string;
  title: string;
  actionTag: string;
  createdAt: string; // Ensure this exists in your interface
}

function DashboardStats() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [publicationData, setPublicationData] = useState<{month: string, articles: number}[]>([]);

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
        const data = await getUserArticles(user._id || user.id);
        setArticles(data);
        
        // Process data for the chart
        const monthlyData = processPublicationData(data);
        setPublicationData(monthlyData);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

  // Process article data for the timeline chart
  const processPublicationData = (articles: Article[]) => {
    const monthCounts: Record<string, number> = {};
    
    articles.forEach(article => {
      if (!article.createdAt) return;
      
      const date = new Date(article.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
    });

    return Object.entries(monthCounts)
      .map(([month, count]) => ({ month, articles: count }))
      .sort((a, b) => {
        // Sort chronologically
        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');
        return new Date(`${aMonth} 1, ${aYear}`).getTime() - new Date(`${bMonth} 1, ${bYear}`).getTime();
      });
  };

  const suspendedArticlesCount = articles.filter(
    article => article.actionTag === 'suspend'
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
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
    },
    // {
    //   title: 'Subscription Status',
    //   value: 'Active',
    //   icon: <Star className="h-6 w-6 text-yellow-500" />,
    // },
    // {
    //   title: 'Subscription Due Date',
    //   value: '12, Sep 2024',
    //   icon: <Users className="h-6 w-6 text-blue-600" />,
    // },
  ];

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
      // <ProtectedRoute requireSubscription subscriptionRedirect="/dashboard/subscription">
        <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
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

      {/* Article Publication Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" /> 
            Article Publication Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {publicationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={publicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="articles" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No publication data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {articles.slice(0, 5).map((article) => (
              <li key={article.id} className="flex justify-between border-b pb-2">
                <span className="truncate max-w-[180px]">{article.title}</span>
                <span className="font-medium text-sm text-gray-600">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
      // </ProtectedRoute>
    
  )
}

export default DashboardStats;