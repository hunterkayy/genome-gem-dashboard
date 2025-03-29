
import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Info, Search, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Mock data for genetic traits
const traitCategories = [
  { id: 'health', name: 'Health Predispositions', icon: '🫀' },
  { id: 'traits', name: 'Traits & Characteristics', icon: '👁️' },
  { id: 'carrier', name: 'Carrier Status', icon: '🧬' },
  { id: 'drug', name: 'Drug Response', icon: '💊' },
];

const mockTraits = [
  {
    id: 1,
    name: 'Lactose Intolerance',
    category: 'health',
    genotype: 'G/A',
    significance: 'high',
    impact: 'negative',
    description: 'Your genotype indicates a higher likelihood of lactose intolerance, which is the inability to fully digest lactose, the sugar in milk and dairy products.',
    details: 'The G/A genotype at rs4988235 is associated with reduced production of the lactase enzyme in adulthood, leading to symptoms when consuming dairy products. This genetic variant is common in many populations worldwide.',
    genes: ['LCT', 'MCM6'],
    rsid: 'rs4988235',
    references: [
      'Enattah NS, et al. Identification of a variant associated with adult-type hypolactasia. Nat Genet. 2002;30(2):233-237.',
      'Ingram CJ, et al. Lactose digestion and the evolutionary genetics of lactase persistence. Hum Genet. 2009;124(6):579-591.'
    ]
  },
  {
    id: 2,
    name: 'Bitter Taste Perception',
    category: 'traits',
    genotype: 'C/C',
    significance: 'medium',
    impact: 'neutral',
    description: 'Your genotype suggests you likely experience a stronger bitter taste from certain compounds like those found in broccoli, coffee, and dark chocolate.',
    details: 'The C/C genotype at rs713598 in the TAS2R38 gene is associated with increased sensitivity to bitter compounds like PTC and PROP. This may influence your food preferences.',
    genes: ['TAS2R38'],
    rsid: 'rs713598',
    references: [
      'Kim UK, et al. Positional cloning of the human quantitative trait locus underlying taste sensitivity to phenylthiocarbamide. Science. 2003;299(5610):1221-1225.'
    ]
  },
  {
    id: 3,
    name: 'Caffeine Metabolism',
    category: 'drug',
    genotype: 'A/C',
    significance: 'medium',
    impact: 'neutral',
    description: 'Your genotype suggests an intermediate metabolism of caffeine, meaning you process caffeine at a moderate rate.',
    details: 'With the A/C genotype at rs762551 in the CYP1A2 gene, you metabolize caffeine at a moderate rate. This may impact how long caffeine affects you and your sensitivity to its effects.',
    genes: ['CYP1A2'],
    rsid: 'rs762551',
    references: [
      'Cornelis MC, et al. Coffee, CYP1A2 genotype, and risk of myocardial infarction. JAMA. 2006;295(10):1135-1141.',
      'Palatini P, et al. CYP1A2 genotype modifies the association between coffee intake and the risk of hypertension. J Hypertens. 2009;27(8):1594-1601.'
    ]
  },
  {
    id: 4,
    name: 'Cystic Fibrosis Carrier Status',
    category: 'carrier',
    genotype: 'G/G',
    significance: 'high',
    impact: 'positive',
    description: 'Your genotype indicates you are not a carrier for the most common CFTR mutation that causes cystic fibrosis.',
    details: 'The G/G genotype at rs113993960 (delta F508) indicates you do not carry the most common mutation associated with cystic fibrosis. However, there are many other mutations in the CFTR gene that this test does not assess.',
    genes: ['CFTR'],
    rsid: 'rs113993960',
    references: [
      'Sosnay PR, et al. Defining the disease liability of variants in the cystic fibrosis transmembrane conductance regulator gene. Nat Genet. 2013;45(10):1160-1167.'
    ]
  },
  {
    id: 5,
    name: 'Alcohol Flush Reaction',
    category: 'drug',
    genotype: 'G/A',
    significance: 'high',
    impact: 'neutral',
    description: 'Your genotype suggests you may experience a moderate flushing reaction when consuming alcohol.',
    details: 'The G/A genotype at rs671 in the ALDH2 gene is associated with reduced aldehyde dehydrogenase activity, which can cause facial flushing, nausea, and rapid heartbeat when consuming alcohol. This variant is particularly common in East Asian populations.',
    genes: ['ALDH2'],
    rsid: 'rs671',
    references: [
      'Brooks PJ, et al. The alcohol flushing response: an unrecognized risk factor for esophageal cancer from alcohol consumption. PLoS Med. 2009;6(3):e50.'
    ]
  },
  {
    id: 6,
    name: 'Eye Color - Blue vs. Brown',
    category: 'traits',
    genotype: 'A/G',
    significance: 'medium',
    impact: 'neutral',
    description: 'Your genotype is associated with an intermediate probability of blue eye color.',
    details: 'The A/G genotype at rs12913832 in the HERC2 gene, which affects OCA2 expression, is associated with an intermediate probability of blue eye color. Eye color is complex and influenced by multiple genes.',
    genes: ['HERC2', 'OCA2'],
    rsid: 'rs12913832',
    references: [
      'Eiberg H, et al. Blue eye color in humans may be caused by a perfectly associated founder mutation in a regulatory element located within the HERC2 gene inhibiting OCA2 expression. Hum Genet. 2008;123(2):177-187.'
    ]
  },
  {
    id: 7,
    name: 'Celiac Disease Risk',
    category: 'health',
    genotype: 'T/T',
    significance: 'medium',
    impact: 'neutral',
    description: 'Your genotype indicates typical risk for celiac disease compared to the general population.',
    details: 'The T/T genotype at rs2187668, which tags the HLA-DQ2.5 haplotype, does not increase risk for celiac disease. However, celiac risk is influenced by multiple genetic and environmental factors.',
    genes: ['HLA-DQA1', 'HLA-DQB1'],
    rsid: 'rs2187668',
    references: [
      'Dubois PC, et al. Multiple common variants for celiac disease influencing immune gene expression. Nat Genet. 2010;42(4):295-302.'
    ]
  },
  {
    id: 8,
    name: 'Malaria Resistance',
    category: 'health',
    genotype: 'T/T',
    significance: 'high',
    impact: 'positive',
    description: 'Your genotype is associated with increased resistance to severe malaria.',
    details: 'The T/T genotype at rs334, corresponding to the normal hemoglobin A variant, does not provide the increased malaria resistance associated with the sickle hemoglobin variant (HbS). However, it also means you do not have sickle cell disease or trait.',
    genes: ['HBB'],
    rsid: 'rs334',
    references: [
      'Allison AC. Protection afforded by sickle-cell trait against subtertian malarial infection. Br Med J. 1954;1(4857):290-294.',
      'Taylor SM, et al. Haemoglobinopathies and the clinical epidemiology of malaria: a systematic review and meta-analysis. Lancet Infect Dis. 2012;12(6):457-468.'
    ]
  },
];

interface TraitCardProps {
  trait: typeof mockTraits[0];
}

const TraitCard: React.FC<TraitCardProps> = ({ trait }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'high':
        return <Badge variant="outline" className="font-medium">High Significance</Badge>;
      case 'medium':
        return <Badge variant="outline" className="font-medium">Medium Significance</Badge>;
      default:
        return <Badge variant="outline" className="font-medium">Low Significance</Badge>;
    }
  };

  const getImpactIndicator = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <div className="w-3 h-3 rounded-full bg-genomics-protective"></div>;
      case 'negative':
        return <div className="w-3 h-3 rounded-full bg-genomics-risk"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-genomics-uncertain"></div>;
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {getImpactIndicator(trait.impact)}
            <CardTitle className="text-lg ml-2">{trait.name}</CardTitle>
          </div>
          {getSignificanceBadge(trait.significance)}
        </div>
        <CardDescription>
          <div className="flex items-center mt-1">
            <Tag className="h-3 w-3 mr-1" />
            <span className="text-xs">{trait.genotype} ({trait.rsid})</span>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm">{trait.description}</p>
      </CardContent>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardFooter className="pt-0 flex justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center p-0">
              <span className="text-xs">Details</span>
              <ChevronDown className={`h-4 w-4 ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs max-w-xs">
                  Genes involved: {trait.genes.join(', ')}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
        
        <CollapsibleContent className="px-6 pb-4">
          <div className="border-t pt-3 mt-2">
            <h4 className="text-sm font-medium mb-2">Scientific Details</h4>
            <p className="text-xs text-muted-foreground mb-3">{trait.details}</p>
            
            <h4 className="text-sm font-medium mb-2">References</h4>
            <ul className="text-xs text-muted-foreground space-y-2">
              {trait.references.map((ref, index) => (
                <li key={index} className="flex items-start">
                  <ExternalLink className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

const Summary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('health');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTraits = mockTraits.filter(trait => 
    (activeTab === 'all' || trait.category === activeTab) &&
    (searchQuery === '' || 
     trait.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     trait.genes.some(gene => gene.toLowerCase().includes(searchQuery.toLowerCase())) ||
     trait.rsid.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-heading mb-2">Trait Summary</h2>
        <p className="text-muted-foreground">
          Explore your genetically influenced traits categorized by type. 
          Each trait includes your specific genotype and its significance.
        </p>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by trait, gene, or SNP ID..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          {traitCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex-1"
            >
              <span className="mr-2">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
          <TabsTrigger value="all">All Traits</TabsTrigger>
        </TabsList>
        
        {traitCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTraits.map(trait => (
                <TraitCard key={trait.id} trait={trait} />
              ))}
            </div>
            
            {filteredTraits.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No traits matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
        ))}
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTraits.map(trait => (
              <TraitCard key={trait.id} trait={trait} />
            ))}
          </div>
          
          {filteredTraits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No traits matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Summary;
