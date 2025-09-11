'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PencilIcon, TrashIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { deleteArticle, getUserArticles, updateArticle } from '@/services/article';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/app/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/lib/ProtectedRoute';

interface Article {
  id: string;
  title: string;
  content: string;
  authorName: string;
  category?: string;
  viewCount: number;
  actionTag: string;
  date: string;
  createdAt: string;
}

interface ViewData {
  articleId: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function ArticleManagementPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingConsent, setTrackingConsent] = useState<boolean | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);

  // Initialize tracking consent from cookies
  useEffect(() => {
    const consent = document.cookie
      .split('; ')
      .find(row => row.startsWith('trackingConsent='))
      ?.split('=')[1];
    
    if (consent === undefined) {
      setShowConsentBanner(true);
    } else {
      setTrackingConsent(consent === 'true');
    }
  }, []);

  // Fetch articles when user is set
  useEffect(() => {
    if (!user) return;

    const fetchMyArticles = async () => {
      try {
        setLoading(true);
        const data = await getUserArticles(user._id || user.id);

        // Map _id to id for each article
        const mappedData = data.map((article: any) => ({
          ...article,
          id: article._id || article.id, // fallback to id if already mapped
        }));

        setArticles(mappedData);
        setFilteredArticles(mappedData); // Initialize filtered articles
      } catch (err) {
        console.error(err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

  // Filter articles based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles(articles);
      setCurrentPage(1); // Reset to first page when search is cleared
      return;
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, articles]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const getStatusInfo = (actionTag: string) => {
    switch (actionTag) {
      case 'spot':
        return { label: 'Spotlight', className: 'bg-blue-100 text-blue-800' };
      case 'fspot':
        return { label: 'Featured Spotlight', className: 'bg-purple-100 text-purple-800' };
      case 'feat':
        return { label: 'Featured Article', className: 'bg-yellow-100 text-yellow-800' };
      case 'suspend':
        return { label: 'Suspended', className: 'bg-red-100 text-red-800' };
      case '':
      case 'unsuspend':
        return { label: 'Active', className: 'bg-green-100 text-green-800' };
      default:
        return { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };


  // Track article view with cookie
  const trackArticleView = async (articleId: string): Promise<boolean> => {
    if (trackingConsent !== true) return false;

    const now = new Date();
    const viewData: ViewData = {
      articleId,
      timestamp: now.toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };

    try {
      // Cookie-based unique view tracking
      const viewedArticles = document.cookie
        .split('; ')
        .find(row => row.startsWith('viewedArticles='))
        ?.split('=')[1];

      const viewedArticlesArray = viewedArticles ? JSON.parse(viewedArticles) : [];

      if (!viewedArticlesArray.includes(articleId)) {
        const newViewedArticles = [...viewedArticlesArray, articleId];
        document.cookie = `viewedArticles=${JSON.stringify(newViewedArticles)}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
        
        // Update local view count optimistically
        setArticles(prev => prev.map(article => 
          article.id === articleId 
            ? { ...article, views: article.viewCount + 1 } 
            : article
        ));
        
        return true;
      }
    } catch (error) {
      console.error('Tracking failed:', error);
    }
    
    return false;
  };

  const handleEdit = (article: Article) => {
    setCurrentArticle(article);
    setEditedTitle(article.title);
    setEditedContent(article.content);
    setEditedCategory(article.category || '');
    setIsEditModalOpen(true);
  };

const handleSave = async () => {
  if (!currentArticle) return;

  try {
    setLoading(true);
    setError('');
    
    const articleData = {
      title: editedTitle,
      content: editedContent,
      category: editedCategory
    };

    const response = await updateArticle(currentArticle.id, articleData);
    
    // Update local state
    setArticles(articles.map(article =>
      article.id === currentArticle.id ? response.data : article
    ));
    setFilteredArticles(filteredArticles.map(article =>
      article.id === currentArticle.id ? response.data : article
    ));

    // Show success feedback
    setIsSuccessModalOpen(true);
    setIsEditModalOpen(false);

    // Optional: Force refresh from server
    const data = await getUserArticles(user?._id || user?.id || '');
    setArticles(data);
    setFilteredArticles(data);

  } catch (error) {
    console.error('Update error:', error);
    setError(error instanceof Error ? error.message : 'Update failed');
    toast.error('Update failed', {
      position: "top-center",
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};
   const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      setLoading(true);
      await deleteArticle(articleToDelete);
      setArticles(articles.filter(article => article.id !== articleToDelete));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete article:', error);
      setError('Failed to delete article');
    } finally {
      setLoading(false);
    }
  };

    const handleConsent = (consent: boolean) => {
    setTrackingConsent(consent);
    document.cookie = `trackingConsent=${consent}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    setShowConsentBanner(false);
  };
  // ... (keep all your existing handler functions: trackArticleView, handleEdit, handleSave, handleDelete, handleConsent)

  return (
     <ProtectedRoute requireSubscription subscriptionRedirect="/dashboard/subscription">
<div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Tracking Consent Banner */}
      {showConsentBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              We use cookies to track article views and improve your experience. 
              By clicking "Accept", you consent to our use of cookies.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleConsent(false)}
                className="bg-transparent text-white hover:bg-gray-700"
              >
                Reject
              </Button>
              <Button 
                size="sm"
                onClick={() => handleConsent(true)}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Manage Articles</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Input 
              placeholder="Search articles..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map(option => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedArticles.length > 0 ? (
                paginatedArticles.map(article => (
                  <TableRow 
                    key={article.id}
                    onClick={() => trackArticleView(article.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.authorName}</TableCell>
                    <TableCell>{article.viewCount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusInfo(article.actionTag).className}`}>
                        {getStatusInfo(article.actionTag).label}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(article);
                        }}
                      >
                        <PencilIcon className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setArticleToDelete(article.id);
                          setIsDeleteDialogOpen(true);
                        }}
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
                    No articles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {filteredArticles.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Article Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
              Make changes to your article here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="category"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSave}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Success!</AlertDialogTitle>
      <AlertDialogDescription>
        Your article has been updated successfully.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogAction>Continue</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
     </ProtectedRoute>
    
  );
}