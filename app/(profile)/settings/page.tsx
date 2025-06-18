import { ArrowLeft, Bell, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
export default function Component() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Settings Sidebar */}
      <div className="w-80 bg-white border-r border-[#d9d9d9] p-6">
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="w-5 h-5 text-[#858585]" />
          <span className="text-[#858585] text-lg">settings</span>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#1c1c1c]">
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-lg">✏️</span>
            </div>
            <span className="font-medium">Edit profile</span>
          </div>

          <div className="flex items-center gap-3 text-[#858585]">
            <Bell className="w-5 h-5" />
            <span>Notification</span>
          </div>

          <div className="flex items-center gap-3 text-[#858585]">
            <div className="w-5 h-5 flex items-center justify-center">
              <span>🔒</span>
            </div>
            <span>Security</span>
          </div>

          <div className="flex items-center gap-3 text-[#858585]">
            <Settings className="w-5 h-5" />
            <span>Appearance</span>
          </div>

          <div className="flex items-center gap-3 text-[#858585]">
            <div className="w-5 h-5 flex items-center justify-center">
              <span>❓</span>
            </div>
            <span>Help</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#1c1c1c]">Edit profile</h1>
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Profile picture"
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-[#1c1c1c] font-medium mb-2 block">
                  First Name
                </Label>
                <Input id="firstName" defaultValue="Mehrab" className="border-[#d9d9d9] text-[#858585]" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-[#1c1c1c] font-medium mb-2 block">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue="Bozorgi" className="border-[#d9d9d9] text-[#858585]" />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-[#1c1c1c] font-medium mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  defaultValue="Mehrabbozorgi.business@gmail.com"
                  className="border-[#d9d9d9] text-[#858585] pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-[#23b000] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-[#1c1c1c] font-medium mb-2 block">
                Address
              </Label>
              <Input id="address" defaultValue="33062 Zboncak isle" className="border-[#d9d9d9] text-[#858585]" />
            </div>

            <div>
              <Label htmlFor="contact" className="text-[#1c1c1c] font-medium mb-2 block">
                Contact Number
              </Label>
              <Input id="contact" defaultValue="58077.79" className="border-[#d9d9d9] text-[#858585]" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city" className="text-[#1c1c1c] font-medium mb-2 block">
                  City
                </Label>
                <Select defaultValue="mehrab">
                  <SelectTrigger className="border-[#d9d9d9] text-[#858585]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mehrab">Mehrab</SelectItem>
                    <SelectItem value="other">Other City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="state" className="text-[#1c1c1c] font-medium mb-2 block">
                  State
                </Label>
                <Select defaultValue="bozorgi">
                  <SelectTrigger className="border-[#d9d9d9] text-[#858585]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bozorgi">Bozorgi</SelectItem>
                    <SelectItem value="other">Other State</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#1c1c1c] font-medium mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  defaultValue="sbdfbnd65sfdvb s"
                  className="border-[#d9d9d9] text-[#858585] pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-[#23b000] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="px-8 py-2 border-[#ff7008] text-[#ff7008] hover:bg-[#ff7008] hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-8 py-2 bg-[#ff7008] hover:bg-[#ff7008]/90 text-white">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
