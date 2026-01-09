import ext1 from "@assets/ext_1767287926767.jpg";
import ext2 from "@assets/resext1_1767287926769.jpg";

import res1 from "@assets/resint1_1767287926770.jpg";
import res2 from "@assets/resint2_1767287926770.jpg";
import res3 from "@assets/resint3_1767287926770.jpg";
import res4 from "@assets/resint4_1767287926770.jpg";
import res5 from "@assets/resint7_1767287926771.jpg";
import res6 from "@assets/290898_1767287926767.jpg";

import off1 from "@assets/offint1_1767287926769.jpg";
import off2 from "@assets/offint2_1767287926769.jpg";
import off3 from "@assets/offint4_1767287926769.jpg";

import fpMain from "@assets/floorplan_main_1767287926767.jpg";
import fpOffice from "@assets/floorplan_office_1767287926768.jpg";
import fpUpper from "@assets/floorplan_upper_1767287926768.jpg";

import background from "@assets/background__1767287926767.png";

export const PROPERTY_DATA = {
  address: "2224 Main Street",
  city: "Santa Monica",
  state: "CA",
  zip: "90405",
  price: "$10,395,000",
  type: "Mixed-Use Residential Office Building",
  description: "A rare opportunity to own a stunning showplace residence situated above an elegant, fully equipped office space.",
  stats: [
    { label: "Land", value: "± 5,196 SF" },
    { label: "Garage & Workroom", value: "± 4,840 SF" },
    { label: "Office", value: "± 2,936 SF" },
    { label: "Res. 2nd Floor", value: "± 2,704 SF" },
    { label: "Res. 3rd Floor", value: "± 1,606 SF" },
    { label: "Decks & Patios", value: "± 4,102 SF" },
  ],
  highlights: [
    "One-of-a-Kind Live/Work Masterpiece",
    "Private Subterranean Parking (9 spaces)",
    "Unmatched Ocean & City Views (360°)",
    "Prime Coastal Lifestyle",
    "Walker's Paradise (Score 96)",
    "Private Residence Elevator",
    "Indoor/Outdoor Flow",
  ],
  images: {
    exterior: [ext1, ext2],
    interior_res: [res1, res2, res3, res4, res5, res6],
    interior_off: [off1, off2, off3],
    floorplans: [fpMain, fpOffice, fpUpper],
    background: background
  },
  contacts: [
    { name: "Pat Ayau", role: "Founding Principal", phone: "310 899 2712", email: "payau@leewestla.com", dre: "00887794" },
    { name: "Andrew Wilson", role: "Principal", phone: "310 899 2717", email: "awilson@leewestla.com", dre: "00921356" },
  ]
};
