
import React, { useState } from 'react';
import { FileUp, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const Upload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Reset states
    setError(null);
    setIsComplete(false);
    setProgress(0);
    
    // Check file type
    const validTypes = ['.txt', '.csv', 'text/plain', 'text/csv', 'application/csv'];
    const fileType = file.type;
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.some(type => fileType === type || fileExtension === type)) {
      setError('Invalid file type. Please upload a .txt or .csv file');
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a .txt or .csv file containing 23andMe data.",
      });
      return;
    }
    
    setFile(file);
    toast({
      title: "File selected",
      description: `${file.name} is ready to be processed.`,
    });
  };

  const processFile = () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress updates
    const totalDuration = 3000; // 3 seconds
    const interval = 100; // Update every 100ms
    const steps = totalDuration / interval;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsProcessing(false);
        setIsComplete(true);
        toast({
          title: "Processing complete",
          description: "Your genomic data has been successfully processed.",
        });
      }
    }, interval);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 animate-fade-in">
      <h2 className="text-2xl font-heading mb-6">Upload Your Genomic Data</h2>
      
      <div className="genomics-card mb-8">
        <div className="text-left mb-6">
          <h3 className="text-lg font-medium mb-2">Supported File Formats</h3>
          <p className="text-muted-foreground">
            Upload your raw data from 23andMe (.txt or .csv formats). 
            All processing happens locally on your computer - your genetic data will never leave your device.
          </p>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : file
              ? 'border-genomics-protective/70 bg-genomics-protective/5'
              : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".txt,.csv"
            onChange={handleFileSelect}
          />
          
          {!file ? (
            <>
              <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drag and drop your file here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse your files
              </p>
              <Button variant="outline">Select File</Button>
            </>
          ) : (
            <>
              <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{file.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              {isComplete && (
                <div className="flex items-center justify-center text-genomics-protective mt-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Processing complete</span>
                </div>
              )}
            </>
          )}
          
          {error && (
            <div className="flex items-center justify-center text-destructive mt-4">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
        </div>
        
        {file && !isComplete && (
          <div className="mt-6">
            {isProcessing && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium">Processing: {progress}%</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            <Button 
              className="w-full"
              onClick={processFile}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Process Genomic Data'}
            </Button>
          </div>
        )}
        
        {isComplete && (
          <div className="mt-6">
            <Button 
              className="w-full"
              variant="default"
              onClick={() => window.location.href = '/'}
            >
              View Dashboard Results
            </Button>
          </div>
        )}
      </div>
      
      <div className="genomics-card">
        <h3 className="text-lg font-medium mb-4">Privacy Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-medium mb-2">Local Processing</h4>
            <p className="text-sm text-muted-foreground">
              All data processing happens directly on your device. 
              Your genetic information never leaves your computer or gets 
              uploaded to any server.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2">Data Security</h4>
            <p className="text-sm text-muted-foreground">
              Your data is stored only on your local device. We recommend keeping 
              your operating system and security software up to date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
