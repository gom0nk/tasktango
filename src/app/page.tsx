import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2, ListTodo, Clock, Calendar, Tag, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 md:px-12 border-b">
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6" />
          <h1 className="text-xl font-bold">TaskTango</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth">
            <Button variant="outline" size="sm">Log in</Button>
          </Link>
          <Link href="/auth?tab=register">
            <Button size="sm" className="cursor-pointer" >Sign up free</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Clarity, finally.</h2>
        <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          With the perfect combination of simplicity and power, TaskTango helps you stay organized and focused on what matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth?tab=register">
            <Button size="lg" className="cursor-pointer">Start for free</Button>
          </Link>
          <Button variant="outline" size="lg">Learn more</Button>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 dark:from-background/40 dark:to-background/10 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-background/80 dark:bg-background/80 p-6 rounded-lg shadow-lg max-w-md">
              <h3 className="text-xl font-semibold mb-4">Your tasks, organized</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Complete project proposal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Team meeting at 3pm</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Submit report by Friday</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Capture tasks at the speed of thought</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick capture, anywhere</h3>
            <p className="text-muted-foreground mb-6">
              Never lose track of a brilliant idea again. Quickly capture tasks as they come to mind and organize them later.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Capture tasks from any device</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Natural language processing understands dates and priorities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Voice capture for hands-free task creation</span>
              </li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Add a task..."
                className="w-full p-2 bg-background border rounded-md"
              />
              <Button size="sm">Add</Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try typing:</p>
              <p className="text-sm">"Meeting with team tomorrow at 3pm #work"</p>
              <p className="text-sm">"Buy groceries on Saturday p1"</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-muted/50 rounded-lg p-6 border shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Work</span>
                </div>
                <span className="text-sm text-muted-foreground">12 tasks</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Personal</span>
                </div>
                <span className="text-sm text-muted-foreground">8 tasks</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Health</span>
                </div>
                <span className="text-sm text-muted-foreground">5 tasks</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-4">Stay organized and focused</h3>
            <p className="text-muted-foreground mb-6">
              Organize tasks by projects, tags, and filters. Focus on what's important right now and plan for what's next.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Create projects to group related tasks</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Set priorities to focus on what matters</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                <span>Custom filters for your unique workflow</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials/Benefits Section */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">A home for your team's tasks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaborate seamlessly</h3>
              <p className="text-muted-foreground">
                Share projects, assign tasks, and track progress together with your team.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Plan your days</h3>
              <p className="text-muted-foreground">
                Schedule tasks, set deadlines, and get a clear view of your upcoming work.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Achieve more</h3>
              <p className="text-muted-foreground">
                Track your progress and celebrate completing tasks to stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get started with TaskTango today</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who have found clarity and productivity with TaskTango.
        </p>
        <Link href="/auth?tab=register">
          <Button size="lg" className="cursor-pointer">Sign up for free</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              <span className="font-bold">TaskTango</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskTango. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}