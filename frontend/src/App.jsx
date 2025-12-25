import { Button } from "./components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>AI Code Review Platform</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4">
            Frontend setup is complete. Tailwind + shadcn/ui are working 🎉
          </p>

          <Button>
            This is a shadcn Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
