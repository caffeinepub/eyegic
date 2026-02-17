import { Loader2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import AccessDeniedScreen from '../../components/auth/AccessDeniedScreen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsCallerAdmin } from '../../hooks/auth/useIsCallerAdmin';
import { useMobileNumberVerifications } from '../../hooks/admin/useMobileNumberVerifications';

export default function AdminNotificationsPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: verifications, isLoading: verificationsLoading } = useMobileNumberVerifications(isAdmin === true);

  if (adminLoading) {
    return (
      <RequireLogin message="Please log in to access the admin dashboard">
        <PageLayout>
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  if (!isAdmin) {
    return (
      <RequireLogin message="Please log in to access the admin dashboard">
        <PageLayout>
          <AccessDeniedScreen />
        </PageLayout>
      </RequireLogin>
    );
  }

  // Sort verifications newest first
  const sortedVerifications = verifications
    ? [...verifications].sort((a, b) => Number(b.verifiedAt - a.verifiedAt))
    : [];

  return (
    <RequireLogin message="Please log in to access the admin dashboard">
      <PageLayout title="Admin Dashboard" description="Mobile number verification notifications">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>User Interest Notifications</CardTitle>
              <CardDescription>
                Users who have verified their mobile number and shown interest in booking EYEGIC services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {verificationsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : sortedVerifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No verification records yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mobile Number</TableHead>
                      <TableHead>Verified At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedVerifications.map((verification, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{verification.mobileNumber}</TableCell>
                        <TableCell>
                          {new Date(Number(verification.verifiedAt) / 1000000).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </RequireLogin>
  );
}
