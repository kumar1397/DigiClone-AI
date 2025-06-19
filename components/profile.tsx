import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
export default function Profile() {
  return (
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
              <Label
                htmlFor="firstName"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue="Mehrab"
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue="Bozorgi"
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="email"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
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
              <Label
                htmlFor="contact"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Contact Number
              </Label>
              <Input
                id="contact"
                defaultValue="58077.79"
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>

          </div>


          <div className="grid grid-cols-2 gap-6">
            
          </div>
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="px-8 py-2 border-[#ff7008] text-[#ff7008] hover:bg-[#ff7008] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 bg-[#ff7008] hover:bg-[#ff7008]/90 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
