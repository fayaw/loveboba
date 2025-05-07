
    import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Users, Send, Star, MapPin } from 'lucide-react';

    const App = () => {
      const [email, setEmail] = useState('');
      const [bobaShop, setBobaShop] = useState('');
      const [city, setCity] = useState('');
      const [joinCount, setJoinCount] = useState(() => {
        const savedCount = localStorage.getItem('bobaBetaJoinCount');
        return savedCount ? parseInt(savedCount, 10) : 2184; // Initial count or from localStorage
      });
      const [isSubmitted, setIsSubmitted] = useState(false);
      const { toast } = useToast();

      useEffect(() => {
        localStorage.setItem('bobaBetaJoinCount', joinCount.toString());
      }, [joinCount]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !city) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please fill in your email and city to join the beta.",
          });
          return;
        }

        // Simulate API call & store data in localStorage
        const betaUser = { email, bobaShop, city, joinedAt: new Date().toISOString() };
        let users = JSON.parse(localStorage.getItem('bobaBetaUsers')) || [];
        users.push(betaUser);
        localStorage.setItem('bobaBetaUsers', JSON.stringify(users));

        setJoinCount(prevCount => prevCount + 1);
        setIsSubmitted(true);

        toast({
          title: "Woohoo! You're in!",
          description: "Thanks for joining the BobaDeals beta. We'll keep you posted!",
        });

        // Clear form (optional)
        // setEmail('');
        // setBobaShop('');
        // setCity('');
      };

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          <Toaster />
          
          {/* Decorative Bubbles */}
          <motion.div 
            className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full opacity-30 filter blur-xl"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 filter blur-xl"
            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
           <motion.div 
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-orange-200 rounded-full opacity-40 filter blur-lg"
            animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-md border-purple-200">
              <CardHeader className="text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="mx-auto mb-4"
                >
                  <img  alt="Boba Drink Illustration" class="w-24 h-24" src="https://images.unsplash.com/photo-1657759558201-d0229a8c87d5" />
                </motion.div>
                <CardTitle className="text-3xl font-extrabold text-white tracking-tight">
                  You Set The Price.
                </CardTitle>
                <CardDescription className="text-purple-100 text-lg mt-1">
                  We Bring The Crowd. Get <span className="font-semibold text-white">Better Boba Deals</span>, Effortlessly.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {!isSubmitted ? (
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Your Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@awesome.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <Send className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bobaShop" className="text-sm font-medium text-gray-700">
                        Favorite Boba Shop (Optional)
                      </Label>
                       <div className="relative mt-1">
                        <Input
                          id="bobaShop"
                          type="text"
                          placeholder="e.g., Happy Lemon, Gong Cha"
                          value={bobaShop}
                          onChange={(e) => setBobaShop(e.target.value)}
                          className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        Your City <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="city"
                          type="text"
                          placeholder="e.g., San Francisco, New York"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-3 text-lg rounded-lg shadow-lg transform transition-all duration-150 ease-in-out">
                        Join Beta & Unlock Deals!
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ rotate: 0, scale: 0 }}
                      animate={{ rotate: 360, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2}}
                      className="inline-block p-4 bg-green-100 rounded-full mb-4"
                    >
                       <img  alt="Checkmark Success Icon" class="w-16 h-16 text-green-500" src="https://images.unsplash.com/photo-1664098295858-1de7e3ff7838" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-800">You're on the list!</h3>
                    <p className="text-gray-600 mt-2">
                      We're excited to have you. Keep an eye on your inbox for updates and exclusive early access.
                    </p>
                  </motion.div>
                )}
              </CardContent>

              <CardFooter className="p-6 bg-purple-50 border-t border-purple-200">
                <div className="flex items-center text-sm text-purple-700 w-full">
                  <Users className="h-5 w-5 mr-2 text-pink-500" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={joinCount}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="font-semibold"
                    >
                      {joinCount.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                  <span className="ml-1">others already unlocking group deals!</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <footer className="absolute bottom-4 text-center text-xs text-purple-500 w-full">
            <p>&copy; {new Date().getFullYear()} BobaDeals. All rights reserved.</p>
            <p>Be the first to know. Join the boba revolution!</p>
          </footer>
        </div>
      );
    };

    export default App;
  