import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const FeedbackForm = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('rating', rating.toString());
      formData.append('feedback', feedback);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbw8ryqutkAqNjs_AmwwtgMghIQyZIW6fr8TqCAlrTs1dVLp61HFv-B1skU8MP3G0YONjg/exec',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('Thank you for your feedback!');
        setRating(0);
        setFeedback('');
        onClose();
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">How do you rate umamic?</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="text-3xl transition-colors hover:scale-110 transform transition-transform"
                style={{
                  color: star <= rating ? 'hsl(var(--star-color))' : 'hsl(var(--muted))'
                }}
              >
                ★
              </button>
            ))}
          </div>

          {/* Feedback Text */}
          <div>
            <Textarea
              placeholder="Tell us what you think about umamic..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;