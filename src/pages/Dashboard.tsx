
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dna, FileText, Database, ChevronRight, AlertTriangle, Layers, BadgeCheck, TabletSmartphone } from 'lucide-react';

// Mock data for dashboard
const snpStats = {
  total: 635012,
  analyzed: 589324,
  coverage: 92.8,
  significant: 1432,
  protective: 421,
  risk: 106,
  uncertain: 905,
};

const recentActivity = [
  { id: 1, action: 'Data processed', time: '2 minutes ago', type: 'processed' },
  { id: 2, action: 'File uploaded', time: '5 minutes ago', type: 'uploaded' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Genome Overview</CardTitle>
            <CardDescription>Summary of analyzed genetic data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Dna className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-semibold">{snpStats.total.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Total SNPs</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Layers className="h-8 w-8 text-secondary mb-2" />
                <span className="text-2xl font-semibold">{snpStats.analyzed.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Analyzed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <Badge className="h-8 w-8 text-genomics-protective mb-2" />
                <span className="text-2xl font-semibold">{snpStats.coverage}%</span>
                <span className="text-sm text-muted-foreground">Coverage</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                <BadgeCheck className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-semibold">{snpStats.significant.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Significant</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Variant Classifications</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-genomics-protective">Protective Variants</span>
                    <span>{snpStats.protective}</span>
                  </div>
                  <Progress value={(snpStats.protective / snpStats.significant) * 100} className="h-2 bg-muted" indicatorClassName="bg-genomics-protective" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-genomics-uncertain">Uncertain Significance</span>
                    <span>{snpStats.uncertain}</span>
                  </div>
                  <Progress value={(snpStats.uncertain / snpStats.significant) * 100} className="h-2 bg-muted" indicatorClassName="bg-genomics-uncertain" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-genomics-risk">Risk Variants</span>
                    <span>{snpStats.risk}</span>
                  </div>
                  <Progress value={(snpStats.risk / snpStats.significant) * 100} className="h-2 bg-muted" indicatorClassName="bg-genomics-risk" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/detailed">
              <Button variant="outline" className="w-full">
                View Detailed Analysis <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`rounded-full p-1.5 ${
                      activity.type === 'processed' ? 'bg-genomics-teal/10 text-genomics-teal' :
                      activity.type === 'uploaded' ? 'bg-primary/10 text-primary' : 'bg-muted'
                    }`}>
                      {activity.type === 'processed' ? (
                        <Dna className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Important Note</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The information provided is for educational purposes only and should not be used for medical decisions without consulting healthcare professionals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/summary" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Summary View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore categorized findings about health predispositions, traits, carrier status, and drug responses.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                View Summary <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
        
        <Link to="/detailed" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Detailed View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Search and filter through your complete SNP data with advanced sorting and bookmarking features.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                View Details <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
        
        <Link to="/settings" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TabletSmartphone className="h-5 w-5 mr-2" />
                App Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage reference databases, display preferences, and export options for your genomic data.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                Open Settings <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
