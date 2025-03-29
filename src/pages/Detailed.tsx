import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsUpDown, 
  Download, 
  Filter, 
  Info, 
  Search, 
  X,
  ExternalLink
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock data for SNPs
const mockSNPs = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  rsid: `rs${100000 + i}`,
  chromosome: Math.floor(Math.random() * 22) + 1,
  position: Math.floor(Math.random() * 100000000) + 1,
  genotype: ['A/A', 'A/T', 'C/G', 'G/G', 'T/T'][Math.floor(Math.random() * 5)],
  gene: ['BRCA1', 'MTHFR', 'APOE', 'COMT', 'CYP2C19', 'ALDH2', 'ACTN3'][Math.floor(Math.random() * 7)],
  significance: ['high', 'medium', 'low', 'unknown'][Math.floor(Math.random() * 4)],
  impact: ['protective', 'risk', 'neutral'][Math.floor(Math.random() * 3)],
  bookmarked: Math.random() > 0.9,
}));

const ITEMS_PER_PAGE = 20;

const Detailed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSNP, setSelectedSNP] = useState<typeof mockSNPs[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [filters, setFilters] = useState({
    chromosome: '',
    gene: '',
    significance: '',
    impact: '',
  });
  
  // Apply filters and search to SNPs
  const filteredSNPs = mockSNPs.filter(snp => {
    // Check if we're only showing bookmarked SNPs
    if (showBookmarkedOnly && !snp.bookmarked) return false;
    
    // Apply dropdown filters
    if (filters.chromosome && snp.chromosome.toString() !== filters.chromosome) return false;
    if (filters.gene && snp.gene !== filters.gene) return false;
    if (filters.significance && snp.significance !== filters.significance) return false;
    if (filters.impact && snp.impact !== filters.impact) return false;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        snp.rsid.toLowerCase().includes(query) ||
        snp.gene.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedSNPs = [...filteredSNPs].sort((a, b) => {
    if (!sortColumn) return 0;
    
    // Cast to any to safely access dynamic properties
    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1)
      : (bValue > aValue ? 1 : -1);
  });
  
  // Pagination
  const totalPages = Math.ceil(sortedSNPs.length / ITEMS_PER_PAGE);
  const paginatedSNPs = sortedSNPs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Toggle bookmark status
  const toggleBookmark = (id: number) => {
    const snpIndex = mockSNPs.findIndex(snp => snp.id === id);
    if (snpIndex >= 0) {
      mockSNPs[snpIndex].bookmarked = !mockSNPs[snpIndex].bookmarked;
      // Force re-render
      setSearchQuery(searchQuery);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      chromosome: '',
      gene: '',
      significance: '',
      impact: '',
    });
    setSearchQuery('');
    setShowBookmarkedOnly(false);
  };
  
  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ChevronDown className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4 transform rotate-180" />;
  };
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'protective':
        return <Badge className="bg-genomics-protective">Protective</Badge>;
      case 'risk':
        return <Badge className="bg-genomics-risk">Risk</Badge>;
      default:
        return <Badge className="bg-genomics-uncertain">Neutral</Badge>;
    }
  };
  
  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'high':
        return <Badge variant="outline" className="border-primary text-primary">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-secondary text-secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Get unique values for filter dropdowns
  const uniqueChromosomes = Array.from(new Set(mockSNPs.map(snp => snp.chromosome))).sort((a, b) => a - b);
  const uniqueGenes = Array.from(new Set(mockSNPs.map(snp => snp.gene))).sort();
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-heading">Detailed SNP View</h2>
          <p className="text-muted-foreground">
            Search, filter, and explore all detected SNPs in your genome.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setFilterOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant={showBookmarkedOnly ? "default" : "outline"} 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
          >
            <BookmarkCheck className="h-4 w-4 mr-2" />
            Bookmarks
          </Button>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by SNP ID or gene..."
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(filters).map(([key, value]) => 
          value ? (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {value}
              <button onClick={() => setFilters({...filters, [key]: ''})}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ) : null
        )}
        {(Object.values(filters).some(Boolean) || showBookmarkedOnly) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6">
            Clear all
          </Button>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <button 
                  className="flex items-center" 
                  onClick={() => handleSort('rsid')}
                >
                  SNP ID {getSortIcon('rsid')}
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center" 
                  onClick={() => handleSort('chromosome')}
                >
                  Chr {getSortIcon('chromosome')}
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <button 
                  className="flex items-center" 
                  onClick={() => handleSort('position')}
                >
                  Position {getSortIcon('position')}
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center" 
                  onClick={() => handleSort('genotype')}
                >
                  Genotype {getSortIcon('genotype')}
                </button>
              </TableHead>
              <TableHead>
                <button 
                  className="flex items-center" 
                  onClick={() => handleSort('gene')}
                >
                  Gene {getSortIcon('gene')}
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Significance</TableHead>
              <TableHead className="hidden md:table-cell">Impact</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSNPs.length > 0 ? (
              paginatedSNPs.map((snp) => (
                <TableRow 
                  key={snp.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedSNP(snp)}
                >
                  <TableCell className="text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(snp.id);
                      }}
                      className={`focus:outline-none ${snp.bookmarked ? 'text-primary' : 'text-muted'}`}
                    >
                      {snp.bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">{snp.rsid}</TableCell>
                  <TableCell>{snp.chromosome}</TableCell>
                  <TableCell className="hidden md:table-cell">{snp.position.toLocaleString()}</TableCell>
                  <TableCell>{snp.genotype}</TableCell>
                  <TableCell>{snp.gene}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getSignificanceBadge(snp.significance)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getImpactBadge(snp.impact)}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>View details for {snp.rsid}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredSNPs.length)} of {filteredSNPs.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Filter Popover */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle>Filter SNPs</SheetTitle>
            <SheetDescription>
              Narrow down results by applying multiple filters
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="chromosome">Chromosome</Label>
              <Select 
                value={filters.chromosome} 
                onValueChange={(value) => setFilters({...filters, chromosome: value})}
              >
                <SelectTrigger id="chromosome">
                  <SelectValue placeholder="Select chromosome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All chromosomes</SelectItem>
                  {uniqueChromosomes.map(chr => (
                    <SelectItem key={chr} value={chr.toString()}>Chromosome {chr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="gene">Gene</Label>
              <Select 
                value={filters.gene} 
                onValueChange={(value) => setFilters({...filters, gene: value})}
              >
                <SelectTrigger id="gene">
                  <SelectValue placeholder="Select gene" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All genes</SelectItem>
                  {uniqueGenes.map(gene => (
                    <SelectItem key={gene} value={gene}>{gene}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="significance">Significance</Label>
              <Select 
                value={filters.significance} 
                onValueChange={(value) => setFilters({...filters, significance: value})}
              >
                <SelectTrigger id="significance">
                  <SelectValue placeholder="Select significance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any significance</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="impact">Impact</Label>
              <Select 
                value={filters.impact} 
                onValueChange={(value) => setFilters({...filters, impact: value})}
              >
                <SelectTrigger id="impact">
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any impact</SelectItem>
                  <SelectItem value="protective">Protective</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="bookmarked" 
                checked={showBookmarkedOnly}
                onCheckedChange={(checked) => setShowBookmarkedOnly(checked === true)}
              />
              <Label htmlFor="bookmarked">Show bookmarked SNPs only</Label>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button variant="default" className="flex-1" onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* SNP Detail View */}
      {selectedSNP && (
        <Sheet open={!!selectedSNP} onOpenChange={() => setSelectedSNP(null)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>{selectedSNP.rsid}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(selectedSNP.id);
                  }}
                  className={`focus:outline-none ${selectedSNP.bookmarked ? 'text-primary' : 'text-muted'}`}
                >
                  {selectedSNP.bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
              </SheetTitle>
              <SheetDescription>
                Chromosome {selectedSNP.chromosome}, Position {selectedSNP.position.toLocaleString()}
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Your Genotype</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <span className="text-xl font-bold">{selectedSNP.genotype}</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Associated Gene</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <span className="text-xl font-bold">{selectedSNP.gene}</span>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Clinical Significance</h3>
                  <div className="flex items-center space-x-2">
                    {getSignificanceBadge(selectedSNP.significance)}
                    <span className="text-sm">Significance Level</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Impact Assessment</h3>
                  <div className="flex items-center space-x-2">
                    {getImpactBadge(selectedSNP.impact)}
                    <span className="text-sm">
                      {selectedSNP.impact === 'protective' 
                        ? 'Potentially beneficial variant' 
                        : selectedSNP.impact === 'risk' 
                        ? 'Potentially harmful variant' 
                        : 'Variant with neutral or unknown effect'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Population Frequency</h3>
                  <p className="text-sm text-muted-foreground">
                    {/* Mock data for population frequency */}
                    This genotype is found in approximately 42% of the general population.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Reference Links</h3>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                      <a href={`https://www.ncbi.nlm.nih.gov/snp/${selectedSNP.rsid}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        NCBI dbSNP: {selectedSNP.rsid}
                      </a>
                    </p>
                    <p className="text-sm flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                      <a href={`https://www.snpedia.com/index.php/${selectedSNP.rsid}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        SNPedia: {selectedSNP.rsid}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Detailed;
