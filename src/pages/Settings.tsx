
import React from 'react';
import { 
  BookOpen, 
  Database, 
  Download, 
  FileText, 
  Monitor, 
  MoonStar, 
  Save, 
  SunMedium, 
  Upload 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import Lock from '@/components/ui/lock-icon';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your genomic data is being prepared for export.",
    });
  };
  
  const handleResetSettings = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been restored to their default values.",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-heading mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Display Preferences
            </CardTitle>
            <CardDescription>
              Customize the appearance of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Theme Mode</h3>
              <RadioGroup 
                defaultValue={theme} 
                onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center">
                    <SunMedium className="h-4 w-4 mr-2" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center">
                    <MoonStar className="h-4 w-4 mr-2" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="scientific-notation" className="flex items-center">
                  Scientific notation
                  <span className="text-xs text-muted-foreground ml-2">
                    (e.g., 1.2e6 instead of 1,200,000)
                  </span>
                </Label>
                <Switch id="scientific-notation" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="snp-display">SNPs per page</Label>
              <Select defaultValue="20">
                <SelectTrigger id="snp-display">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 SNPs</SelectItem>
                  <SelectItem value="20">20 SNPs</SelectItem>
                  <SelectItem value="50">50 SNPs</SelectItem>
                  <SelectItem value="100">100 SNPs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Management
            </CardTitle>
            <CardDescription>
              Control your genomic data and reference databases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Genomic Data</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current data file:</span>
                  <span className="text-sm font-medium">genome_data.txt</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uploaded:</span>
                  <span className="text-sm text-muted-foreground">2 minutes ago</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2 flex items-center justify-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Data
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Reference Databases</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">ClinVar:</span>
                  <Badge 
                    variant="outline" 
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  >
                    Up to date
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">dbSNP:</span>
                  <Badge 
                    variant="outline" 
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  >
                    Up to date
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">GWAS Catalog:</span>
                  <Badge 
                    variant="outline" 
                    className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                  >
                    Update available
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Update Reference Databases
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Export Options
            </CardTitle>
            <CardDescription>
              Export your genetic data and analysis results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                  <SelectItem value="txt">TXT (Tab Delimited Text)</SelectItem>
                  <SelectItem value="json">JSON (JavaScript Object Notation)</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-bookmarks" className="flex items-center">
                  Include bookmarked SNPs only
                </Label>
                <Switch id="include-bookmarks" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-analysis" className="flex items-center">
                  Include analysis and annotations
                </Label>
                <Switch id="include-analysis" defaultChecked />
              </div>
            </div>
            
            <Button 
              className="w-full mt-2"
              onClick={handleExportData}
            >
              Export Genomic Data
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Documentation & Privacy
            </CardTitle>
            <CardDescription>
              Access resources and privacy information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Documentation</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  User Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Data Dictionary
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Scientific References
                </Button>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Privacy Information
              </h3>
              <p className="text-xs text-muted-foreground mb-1">
                This application processes all genomic data locally on your device. Your genetic information is never transmitted to any server or third party.
              </p>
              <p className="text-xs text-muted-foreground">
                Reference databases are downloaded to your device and all analysis is performed offline to ensure maximum privacy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button variant="outline" onClick={handleResetSettings}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
