# Testing approaches:

Used console logs: 

For errors:

Edit profile 
- unable to upload file 
- unable to update user document
- unable to fetch user data

Profile 
- User not found
- Error retrieving friend's data
- No user email matches 

Friend's profile
- User not found
- Error fetching user data
- Error retrieving friend's data
- No matching email address 
- Able to pass UID 

Signup
- Display the error when user is not able to signup

Used Alert Messages/Status:

Profile 
- User does not exist
- Danger



# Manual testing (results):


Test Case 1: Toggle mode test - Light and Dark
- Description: Able to toggle between light and dark mode 
- Preconditions: User must download and launch the application
- Expected result: User should be able to toggle between light and dark mode
- Actual result: User is able to toggle between light and dark mode
- Location: Login page
- Test result: Pass

Test Case 2: Login Test - valid email and password
- Description: Able to succesfully login 
- Preconditions: User should have an exisiting account
- Expected result: Users should be able to login 
- Actual result: User is able to able to login 
- Location: Login page
- Test result: Pass

Test case 3: Login Test - Invalid email and/or password
- Description: Unable to login 
- Preconditions: User should have an exisiting account
- Expected result: User should not be able to login
- Actual result: User is unable to able to login 
- Location: Login page
- Test result: Pass

Test case 4: Logout Test
- Description: Able to successfully logout 
- Preconditions: User should have an existing account
- Expected result: User should succesfully logout
- Actual result: User is able to succesfully logout
- Location: Login page
- Test result: Pass

Test case 5: Home button test:
- Description: Home button is able to direct to a new page
- Preconditions: No pre-conditions
- Expected result: User should be able to go to home page
- Actual result: User is able to go to home page
- Location: Profile page
- Test result: Pass

Test case 6: Edit profile Button test:
- Description: Edit profile button is able to direct to a new page
- Preconditions: No pre-conditions
- Expected result: User should be able to go to edit-profile page
- Actual result: User is able to go to edit profile page
- Location: Profile page
- Test result: Pass

Test case 7: Cancel button test
- Description: Cancel button should redirect back to profile page
- Preconditions: User should be in edit-profile page
- Expected result: User should be able to go to back to own profile
- Actual result: User is able to go to profile 
- Location: Edit profile page
- Test result: Pass

Test case 8: Upload profile picture test
- Description: Upload profile picture
- Preconditions: User needs to have a picture 
- Expected result: User should be able to upload a profile picture
- Actual result: User is able to go to upload a profile picture
- Location: Edit profile page
- Test result: Pass

Test case 9: Tabs test
- Description: switching tabs between "liked places" and "friend list"
- Preconditions: No pre-conditions 
- Expected result: User should be able to switch tabs
- Actual result: User is able to switch tabs
- Location: Profile page
- Test result: Pass

Test case 10: Friend test
- Description: Adding friends
- Preconditions: Friend needs to create an account 
- Expected result: User should be able to add friends
- Actual result: User is able to add friend
- Location: Profile page
- Test result: Pass

Test case 11: Friend List test
- Description: Added friend shows in Friend List
- Preconditions: Friend needs to create an account 
- Expected result: Friend's email should display in the user friend's list
- Actual result: Friend's email is able to display in the user friend's list
- Location: Profile page
- Test result: Pass

Test case 12: Save name functionality test
- Description: Name is able to be saved into firebase
- Preconditions: User needs to input name 
- Expected result: Name should appear in Firebase
- Actual result: Name appears in Firebase
- Location: Edit profile page
- Test result: Pass

Test case 13: Save email functionality test
- Description: Email is able to be saved into firebase
- Preconditions: User needs to input email 
- Expected result: Email should appear in Firebase
- Actual result: Email appears in Firebase
- Location: Edit profile page
- Test result: Pass

Test case 14: Save biography functionality test
- Description: Biography is able to be saved into firebase
- Preconditions: User needs to input biography 
- Expected result: Biography should appear in Firebase
- Actual result: Biography appears in Firebase
- Location: Edit profile page
- Test result: Pass

Test Case 15: Overwrite edit profile test
- Description: Overwrite edit profile when user enter new information
- Preconditions: User needs to have some information in the profile
- Expected result: Profile should be overwritten 
- Actual result: Profile is overwritten
- Location: Edit profile page
- Test result: Pass

Test Case 16: Load name test
- Description: Load name from firebase into profile
- Preconditions: User needs to save name
- Expected result: Name should appear in profile
- Actual result: Name appears in profile
- Location: Profile page
- Test result: Pass

Test Case 17: Load Email test
- Description: Load email from firebase into profile
- Preconditions: User needs to save Email
- Expected result: Email should appear in profile
- Actual result: Email appears in profile
- Location: Profile page
- Test result: Pass

Test Case 18: Load Biography test
- Description: Load biography from firebase into profile
- Preconditions: User needs to save biography
- Expected result: Biography should appear in profile
- Actual result: Biography appears in profile
- Location: Profile page
- Test result: Pass

Test case 19: Mobile responsive test
- Description: Resize profile page to the necessary specifications
- Preconditions: No preconditions
- Expected result: Should be able to resize profile page
- Actual result: Able to resize profile page
- Location: Profile page
- Test result: Pass

Test case 20: Map test - Load Google Maps API
- Description: Loading Google Maps API
- Preconditions: No preconditions
- Expected result: Should be able to load Google Maps API
- Actual result: Able to load Google Maps API
- Location: Home page
- Test result: Pass

Test case 21: Map test - Full screen mode
- Description: Map full screen mode
- Preconditions: No preconditions
- Expected result: Should be able to go to full screen mode
- Actual result: Able to go to full screen mode
- Location: Home page
- Test result: Pass

Test case 22: Map test - User current location
- Description: Able to go to to user current location
- Preconditions: No preconditions
- Expected result: Should be able to see my current location
- Actual result: Able to see my current location
- Location: Home page
- Test result: Pass

Test case 23: Heatmap Test 
- Description: Heatmap under markers
- Preconditions: No preconditions
- Expected result: Should be able to see heatmap under markers
- Actual result: Able to see heatmap under markers
- Location: Home page
- Test result: Pass

Test case 24: Location Information test 
- Description: Location information 
- Preconditions: User need to click on the location
- Expected result: Should be able to see location pop-up information with location name, address and ratings
- Actual result: Able to see to location pop-up information with location name, address and ratings
- Location: Home page
- Test result: Pass

Test case 25: Liked Location functionality test 
- Description: Like locations
- Preconditions: User need to click on the location
- Expected result: Should be able to like location
- Actual result: Able to like location
- Location: Home page
- Test result: Pass

Test case 26: Liked Location list test
- Description: Like location list
- Preconditions: User need to like a location
- Expected result: Should be able to see lists of like locations
- Actual result: Able to see list of like locations
- Location: Profile page
- Test result: Pass

Test case 27: Friend profile page test
- Description: Friend profile page
- Preconditions: User needs to click on friend in friend's list
- Expected result: Should be able to see friend's profile
- Actual result: Able to see friend's profile
- Location: Profile page
- Test result: Pass

Test case 28: Google Chrome browser compatibility test 
- Description: Google Chrome browser compatiblilty 
- Preconditions: user needs to install google chrome
- Expected result: Should be able to run app on Google Chrome
- Actual result: Able to run app on Google Chrome
- Location: None
- Test result: Pass

Test case 29: Firefox browser compatibility test 
- Description: Firefox browser compatiblilty 
- Preconditions: user needs to install Firefox
- Expected result: Should be able to run app on Firefox
- Actual result: Able to run app on Firefox
- Location: None
- Test result: Pass

Test case 30: Safari browser compatibility test 
- Description: Safari browser compatiblilty 
- Preconditions: user needs to install Safari
- Expected result: Should be able to run app on Safari
- Actual result: Able to run app on Safari
- Location: None
- Test result: Pass
