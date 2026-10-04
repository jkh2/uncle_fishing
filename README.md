🎣 Uncle PD's AI Fishing Partner
Welcome to Your Personal Fishing Companion!
Hey Uncle PD! This fishing app was built especially for you and your fishing adventures all over Indiana. It's packed with everything you need to make every fishing trip a success!

🌟 What Makes This App Special
🎯 Built Just for You

Your name is right in the title - this is YOUR app!
Your cartoon avatar appears in the header (just upload unclepd.jpg)
Designed for Indiana waters, from Lake Michigan to the southern reservoirs
All your secret spots stay private on your device

📱 Works Everywhere

Built for your phone: big buttons along the bottom (Map, Conditions, Ask, My Spots)
Sunlight mode (the ☀️ button) makes everything high contrast so you can read it in bright sun
Opens with no signal once it's installed; map areas you've looked at stay saved
Perfect on your phone while you're on the water
Works on tablets and computers too
No internet required once it's loaded (except for live weather)
Installs to your home screen like a real app (iPhone: Share, then "Add to Home Screen"; Android: tap Install)


🗺️ How to Use Your Fishing App
1. Interactive Map 📍

22+ Northwest Indiana lakes with detailed fishing information
Click any red marker to see fish species, techniques, and access info
Zoom and pan to explore the entire region
Every Indiana DNR public access site (the anchor button): dark blue dots have a boat ramp, teal dots are bank or walk-in access. Tap one for motor rules, species, DNR fish survey reports, and depth maps
Depth lines for DNR-surveyed lakes (the waves button): zoom in on a lake to see its contours, with depths labeled up close
Toggle satellite view with the satellite button
Find your location with the crosshairs button
View all lakes with the fish button

2. AI Fishing Assistant 🤖

Powered by Google Gemini (free), and it can see today's conditions, the forecast, nearby DNR access sites, and your catch log
Ask anything: "Where should I go Saturday morning?" or "Why did the bite die this afternoon?"
Quick buttons: Game Plan, What's Biting, Tie On, Best Day, My Patterns, Near Me
Voice input - tap the microphone and talk; tap 🔊 to hear an answer read aloud
With no signal it still answers from what the phone knows (conditions, regulations pointer)

3. Live Conditions 🌤️

Pick any lake, secret spot, or "My current location"
Live weather, wind (and which shore it's pushing bait to), and barometric pressure trend
Moon phase plus solunar major/minor feeding times, sunrise and sunset
A 1–10 bite score that tells you WHY (pressure, wind, moon, time of day)
Real 7-day forecast with wind and rain chances, and a bite score for every day
Best Bets This Week: the two best days to go, why, and the exact window to be on the water (when a solunar major lines up with sunrise or sunset)
Next 12 hours: hour-by-hour temperature, wind, gusts and rain
Safety: National Weather Service warnings show in red across the top of every screen, and storms in the next few hours get a heads-up
Estimated water temp for inland lakes (NOAA link for Lake Michigan)
Refreshes every 15 minutes; shows the last reading if you lose signal
Tap "Conditions" in any map pin to jump straight there

4. Catches and Trophy Room 🏆

Tap "Log a Catch": pick the fish, add size, lure and a photo
The app saves where you were, the time, weather, wind, barometric pressure trend, moon and solunar period automatically
Trophy Room: total catches, personal bests for every species, badges, and the Indiana Slam (16 species to collect)
Your Patterns: after 5 catches, see what conditions, times, lures and waters you catch the most fish in
Send: turns any catch into a picture card with the photo and stats, ready to text to family
Gold fish markers show your catches on the map
Save Backup / Restore keeps your log safe when you change phones

5. Your Secret Spots ⭐

Add your own lakes that only you can see
GPS coordinates automatically filled in
Record fish species, techniques, and access notes
Your personal tips for each spot
Green star markers distinguish your spots from public lakes


🎣 Adding Your Secret Fishing Spots
Step 1: Go to "My Lakes"
Click the plus circle button in the top navigation
Step 2: Click "Add Lake"
The app will try to fill in your current GPS location automatically
Step 3: Fill Out the Details

Lake Name: Whatever you want to call it
Coordinates: GPS location (auto-filled if possible)
Size & Depth: Approximate measurements
Fish Species: What you've caught there (comma separated)
Techniques: What works best (comma separated)
Access Notes: How to get there, parking, etc.
Your Tips: Secret knowledge about this spot!

Step 4: Save and View

Your spot appears as a green star on the map
Click "View" to see it on the map
All data stays private on your device only


🎯 Pro Tips for Uncle PD
📍 Using GPS Effectively

When you find a hot spot, immediately add it while you're there
The app will grab your exact coordinates automatically
Add detailed notes about what worked (time, weather, bait)

🗺️ Map Navigation

Pinch to zoom on phone, scroll wheel on computer
Drag to move around the map
Click markers for detailed information
Use satellite view to see underwater structure

💬 Talking to Your AI Assistant

Ask specific questions: "What's biting at Cedar Lake today?"
Use the quick buttons for common questions
Try voice input when your hands are full
Ask about regulations before trying new spots

📱 Mobile Usage

Works great on your phone while fishing
Save battery by closing other apps
Can work offline once loaded (except live weather)
Consider installing it to your home screen


File Structure:
📁 Your Website Folder
├── 📄 index.html (the main app file)
├── 📄 suncalc.js (sun and moon math for solunar times)
├── 📄 sw.js (lets the app open with no signal)
├── 📄 manifest.webmanifest (lets the app install to the home screen)
├── 📁 icons/ (home screen icons made from your avatar)
└── 🖼️ unclepd.jpg (your cartoon avatar)

🎣 What Each Section Does
🗺️ Map Tab

Interactive map of Northwest Indiana
All public lakes with fishing details
Your secret spots marked with green stars
Real-time GPS and navigation

💬 Chat Tab

AI fishing assistant
Ask questions about conditions, techniques, regulations
Quick action buttons for common questions
Voice input capability

🌤️ Conditions Tab

Bite score with the reasons behind it
Live weather, wind, barometer, moon, and sun
Best times today (solunar periods, dawn and dusk)
7-day forecast

⭐ My Lakes Tab

Your personal secret spots
Add new fishing locations
View and manage your spots
Private data that stays on your device


🚀 Getting Started

Open the app in your web browser
Click around the map to explore existing lakes
Try the chat - ask "What's biting today?"
Check conditions to plan your next trip
Add a secret spot when you find a good one!


🎯 Remember

Your secret spots are PRIVATE - they only exist on your device
Take the app fishing - it works great on your phone
Ask the AI anything - it knows local Indiana fishing
Update your spots - add notes after successful trips
Explore the map - discover new public lakes to try


🎣 Happy Fishing, Uncle PD!
This app was made with love for your fishing adventures. Every feature was designed specifically for Northwest Indiana waters and your personal fishing style.
Tight lines and good luck out there! 🐟

Built with ❤️ for Uncle PD's fishing adventures


🔧 For James: Turning On the AI (one time)

1. Get a free Gemini key at https://aistudio.google.com/apikey (Create API key).
2. Go to https://vercel.com/new, import the jkh2/uncle_fishing repository, and before deploying add an Environment Variable named GEMINI_API_KEY with that key. Deploy.
3. The app and its assistant then live at the Vercel address (for example https://uncle-fishing.vercel.app). The GitHub Pages copy calls that same address; if Vercel picked a different name, update AI_REMOTE_ENDPOINT in index.html.

The key stays on Vercel's server (api/chat.js) and never ships to the phone. Free-tier questions may be used by Google to improve its models, so the app sends secret spot names but never their coordinates.
