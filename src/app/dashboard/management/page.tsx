'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { getUserArticles } from '@/services/article';

interface Article {
  id: string;
  title: string;
  authorName: string;
  views: number;
  status: 'Active' | 'Suspended';
  date: string;
}

// const dummyArticles: Article[] = [
//   {
//     id: '1',
//     title: 'Understanding React Server Components',
//     author: 'Jane Doe',
//     views: 1200,
//     status: 'Active',
//     date: '2025-07-15',
//   },
//   {
//     id: '2',
//     title: 'Next.js 14 Features Overview',
//     author: 'John Smith',
//     views: 800,
//     status: 'Suspended',
//     date: '2025-07-10',
//   },
// ];

export default function ArticleManagementPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  type User = { firstName?: string; lastName?: string; email?: string; id: string }; // Add other fields as needed
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    try {
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      setUser(parsedUser);
    } catch (err) {
      console.error("Failed to parse user from storage:", err);
    }
  }, []);


  useEffect(() => {
    if (!user) return;

    const fetchMyArticles = async () => {
      try {
        const data = await getUserArticles(user.id);
        setArticles(data);
        console.log('user details', articles)
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyArticles();
  }, [user]); // runs when user is set



  const handleEdit = (id: string) => {
    console.log('Edit article:', id);
    // Navigate to /dashboard/articles/[id]/edit
  };

  // const handleDelete = (id: string) => {
  //   if (confirm('Are you sure you want to delete this article?')) {
  //     setArticles(prev => prev.filter(article => article.id !== id));
  //   }
  // };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Manage Articles</CardTitle>
          <Input placeholder="Search articles..." className="w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length > 0 ? (
                articles.map(article => (

                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.authorName}</TableCell>
                    <TableCell>{article.views}</TableCell>
                    <TableCell>{article.status}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(article.id)}
                      >
                        <PencilIcon className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                      // onClick={() => handleDelete(article.id)}
                      >
                        <TrashIcon className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No Article Uploaded
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
