import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-11 px-6 border-border hover:bg-muted/50">
          Advanced
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">Advanced Search</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Use advanced filters to find exactly what you're looking for
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <Input id="title" placeholder="Enter book title" className="border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-foreground">Author</Label>
              <Input id="author" placeholder="Enter author name" className="border-border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn" className="text-foreground">ISBN</Label>
              <Input id="isbn" placeholder="Enter ISBN" className="border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-foreground">Publisher</Label>
              <Input id="publisher" placeholder="Enter publisher" className="border-border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-foreground">Publication Year</Label>
              <Input id="year" type="number" placeholder="Enter year" className="border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Input id="category" placeholder="Enter category" className="border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-foreground">Keywords</Label>
            <Input id="keywords" placeholder="Enter keywords (comma separated)" className="border-border" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="border-border">
            Cancel
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
