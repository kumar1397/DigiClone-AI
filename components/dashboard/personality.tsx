import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface CloneData {
    clone_id: string;
    clone_name: string;
    catchphrases: string[];
    dos: string;
    donts: string;
    freeform_description: string;
    image: string;
    style: string[];
    tone: string[];
    values: string[];
    youtubeLinkUpload: string[];
    otherLinkUpload: string[];
    Status: string;
}

interface PersonalityProps {
    cloneData: CloneData;
    setCloneData: React.Dispatch<React.SetStateAction<CloneData>>;
}

export default function Personality({ cloneData, setCloneData }: PersonalityProps) {
    const [saving, setSaving] = useState(false);
    const [newCatchphraseInput, setNewCatchphraseInput] = useState("");
    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (!cloneData.clone_id) {
                        toast.error("Missing clone ID.");
                        return;
                    }
                    setSaving(true);
                    try {
                        const res = await fetch(
                            `api/clones/${cloneData.clone_id}`,
                            {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    tone: cloneData.tone,
                                    style: cloneData.style,
                                    catchphrases: cloneData.catchphrases,
                                    dos: cloneData.dos,
                                    donts: cloneData.donts,
                                    freeform_description: cloneData.freeform_description,
                                }),
                            }
                        );
                        if (!res.ok) throw new Error("Failed to update clone data");
                        toast.success("Personality updated!");
                    } catch (err) {
                        console.error(err);
                        toast.error("Failed to update personality");
                    } finally {
                        setSaving(false);
                    }
                }}
            >

                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif">Clone Personality</CardTitle>
                        <CardDescription>
                            Define your clone&apos;s tone, style, catchphrases, do&apos;s & don&apos;ts, and a freeform description.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <Label className="text-base font-semibold mb-4 block">Tone</Label>
                                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                    {["Friendly", "Professional", "Visionary", "Humble", "Motivational", "Empathetic", "Witty", "Authoritative", "Caring", "Inspiring"].map((tone) => {
                                        const id = `tone-${tone.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={tone} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={id}
                                                    checked={cloneData.tone.includes(tone)}
                                                    onChange={(e) =>
                                                        setCloneData((prev) => ({
                                                            ...prev,
                                                            tone: e.target.checked
                                                                ? [...prev.tone, tone]
                                                                : prev.tone.filter((t) => t !== tone),
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={id} className="text-sm cursor-pointer">
                                                    {tone}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <Label className="text-base font-semibold mb-4 block">Style</Label>
                                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                    {["Storytelling", "Technical explanation", "Direct and concise", "Conversational", "Philosophical", "Analytical", "Casual", "Educational"].map((style) => {
                                        const id = `style-${style.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={style} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={id}
                                                    checked={cloneData.style.includes(style)}
                                                    onChange={(e) =>
                                                        setCloneData((prev) => ({
                                                            ...prev,
                                                            style: e.target.checked
                                                                ? [...prev.style, style]
                                                                : prev.style.filter((s) => s !== style),
                                                        }))
                                                    }
                                                />
                                                <Label htmlFor={id} className="text-sm cursor-pointer">
                                                    {style}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base font-semibold block">Catchphrases</Label>

                            {/* Display catchphrases */}
                            <div className="flex flex-wrap gap-2">
                                {cloneData.catchphrases.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No catchphrases yet.</p>
                                )}
                                {cloneData.catchphrases.map((phrase, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-muted rounded-full px-3 py-1 text-sm border border-gray-300"
                                    >
                                        {phrase}
                                    </div>
                                ))}
                            </div>

                            {/* Input to add more catchphrases */}
                            <Input
                                type="text"
                                value={newCatchphraseInput}
                                onChange={(e) => setNewCatchphraseInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const newItems = newCatchphraseInput
                                            .split(",")
                                            .map((s) => s.trim())
                                            .filter(Boolean)
                                            .filter((s) => !cloneData.catchphrases.includes(s));
                                        if (newItems.length > 0) {
                                            setCloneData((prev) => ({
                                                ...prev,
                                                catchphrases: [...prev.catchphrases, ...newItems],
                                            }));
                                            setNewCatchphraseInput("");
                                        }
                                    }
                                }}
                                placeholder="Add catchphrases (comma separated) and press Enter"
                            />
                        </div>


                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="dos" className="text-base font-semibold">
                                    Do&apos;s
                                </Label>
                                <Textarea
                                    id="dos"
                                    value={cloneData.dos}
                                    onChange={(e) => setCloneData((prev) => ({ ...prev, dos: e.target.value }))}
                                    placeholder="Things the clone should always do while answering"
                                    className="mt-2 min-h-[120px]"
                                />
                            </div>
                            <div>
                                <Label htmlFor="donts" className="text-base font-semibold">
                                    Don&apos;ts
                                </Label>
                                <Textarea
                                    id="donts"
                                    value={cloneData.donts}
                                    onChange={(e) => setCloneData((prev) => ({ ...prev, donts: e.target.value }))}
                                    placeholder="Things the clone should avoid while answering"
                                    className="mt-2 min-h-[120px]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-base font-semibold mb-2 block">Freeform Description</Label>
                            <Textarea
                                value={cloneData.freeform_description}
                                onChange={(e) =>
                                    setCloneData((prev) => ({
                                        ...prev,
                                        freeform_description: e.target.value,
                                    }))
                                }
                                placeholder={cloneData.freeform_description}
                                className="min-h-[150px]"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground"
                        >
                            {saving ? "Saving..." : "Save Personality"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}