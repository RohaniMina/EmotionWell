
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { createSession } from "@/lib/dataService";

interface ReviewScannerScreenProps {
  onReviewFound: (session: any) => void;
}

const ReviewScannerScreen = ({ onReviewFound }: ReviewScannerScreenProps) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [productName, setProductName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const handleScan = () => {
    setScanning(true);
    // Simulate scanning progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setScanning(false);
        setShowForm(true);
      }
    }, 150);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !reviewComment) return;
    
    // Create a new session for this user
    const session = createSession(productName, reviewComment);
    onReviewFound(session);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Amazon Review Scanner</h2>
        <p className="text-muted-foreground">
          We'll scan for negative product experiences to help manage emotions and improve wellbeing
        </p>
      </div>
      
      {!showForm ? (
        <Card className="p-6 border-calm-100 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Ready to scan your Amazon purchase history?</h3>
            <p className="text-muted-foreground mb-4">
              This will analyze your product reviews to identify experiences that might benefit from our emotional wellbeing program.
            </p>
            
            <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mb-6">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> This is a demonstration. In a real application, we would connect to your 
                Amazon account to analyze actual reviews after obtaining proper permissions.
              </p>
            </div>
            
            {scanning && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Scanning reviews...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleScan}
              disabled={scanning}
              className="bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white font-medium px-8"
            >
              {scanning ? "Scanning..." : "Begin Scan"}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-calm-100 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">We found a negative review</h3>
            <p className="text-muted-foreground mb-4">
              Please confirm or modify the details below to continue with your wellbeing session.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter the product name"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="reviewComment" className="block text-sm font-medium mb-1">
                Your Review Comment
              </label>
              <Textarea
                id="reviewComment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Please describe your negative experience with this product"
                required
                className="w-full h-32"
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-calm-500 to-healing-500 hover:from-calm-600 hover:to-healing-600 text-white font-medium"
              >
                Continue to Wellbeing Session
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Your privacy is important to us. We only use this information to help improve your wellbeing.</p>
      </div>
    </div>
  );
};

export default ReviewScannerScreen;
