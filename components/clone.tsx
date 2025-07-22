"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, Upload, Link as LinkIcon, X, Plus, ArrowLeft } from "lucide-react";
import { toast } from 'react-hot-toast'
import Link from "next/link";
const CreateClone = () => {
  const [cloneName, setCloneName] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [catchphrases, setCatchphrases] = useState("");
  const [dos, setDos] = useState("");
  const [donts, setDonts] = useState("");
  const [freeformDescription, setFreeformDescription] = useState("");

  const toneOptions = [
    "Friendly", "Professional", "Visionary", "Humble", "Motivational", 
    "Empathetic", "Witty", "Authoritative", "Caring", "Inspiring"
  ];

  const styleOptions = [
    "Storytelling", "Technical explanation", "Direct and concise", 
    "Conversational", "Philosophical", "Analytical", "Casual", "Educational"
  ];

  const valueOptions = [
    "Discipline", "Innovation", "Empathy", "Rationality", "Peace", 
    "Unity", "Simplicity", "Growth", "Authenticity", "Excellence"
  ];

  const handleToneChange = (tone: string, checked: boolean) => {
    if (checked) {
      setSelectedTones([...selectedTones, tone]);
    } else {
      setSelectedTones(selectedTones.filter(t => t !== tone));
    }
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    }
  };

  const handleValueChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter(v => v !== value));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Clone created successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold">Clone Profile</h1>
          </div>
          <p className="text-muted-foreground">Configure your digital clone&apos;s personality and behavior</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Clone Name and Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="cloneName" className="text-base font-semibold">Clone Name</Label>
                    <Input
                      id="cloneName"
                      value={cloneName}
                      onChange={(e) => setCloneName(e.target.value)}
                      placeholder="Enter your clone's name"
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <Label className="text-base font-semibold mb-2">Clone Image</Label>
                  <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tone and Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Personality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Tone</Label>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {toneOptions.map((tone) => (
                      <div key={tone} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tone-${tone}`}
                          checked={selectedTones.includes(tone)}
                          onCheckedChange={(checked) => handleToneChange(tone, checked as boolean)}
                        />
                        <Label htmlFor={`tone-${tone}`} className="text-sm cursor-pointer">
                          {tone}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Style</Label>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {styleOptions.map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                        />
                        <Label htmlFor={`style-${style}`} className="text-sm cursor-pointer">
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Catchphrases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Catchphrases</CardTitle>
              <CardDescription>
                Enter up to 5 signature phrases that the clone should use (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={catchphrases}
                onChange={(e) => setCatchphrases(e.target.value)}
                placeholder="Enter signature phrases, separated by commas or new lines"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {valueOptions.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`value-${value}`}
                      checked={selectedValues.includes(value)}
                      onCheckedChange={(checked) => handleValueChange(value, checked as boolean)}
                    />
                    <Label htmlFor={`value-${value}`} className="text-sm cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dos" className="text-base font-semibold">Do&apos;s</Label>
                  <Textarea
                    id="dos"
                    value={dos}
                    onChange={(e) => setDos(e.target.value)}
                    placeholder="Things the clone should always do while answering"
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="donts" className="text-base font-semibold">Don&apos;ts</Label>
                  <Textarea
                    id="donts"
                    value={donts}
                    onChange={(e) => setDonts(e.target.value)}
                    placeholder="Things the clone should avoid while answering"
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Freeform Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Freeform Description</CardTitle>
              <CardDescription>
                Describe in your own words how the clone should behave, think and guide others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={freeformDescription}
                onChange={(e) => setFreeformDescription(e.target.value)}
                placeholder="Describe your clone's personality, approach, and unique characteristics in detail..."
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-12 py-3"
            >
              Create Your Clone
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClone;
