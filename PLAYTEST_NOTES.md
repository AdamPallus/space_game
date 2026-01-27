## playtest 2026-01-26
*  Homing is too powerful. 
    * Limit how far off the original course homing projectiles can do
* eject sound effect is too long.
    * choose a better effect sound
* music is nice. 
*   Music chosen should be at least as long as the level itself or loop seemlessly
* could use some subtle background music in the mothership scene
* After a mission, the player is sent back to the mission select screen but it's not clickable because the mission summary pops up on top of it
    * as soon as the mission pop up is clicked, the user is sent back to the ship loadout menu. 
    * This should be done prior to the popup or there should be a separate mission summary page that then transitions into the mothership scene
* in "pimary upgrades" we have legacy upgrades
    * definitely remove "plasma spread" 
    * keep the other two for now but long-term we want to replace this with some other way to increase base damage and fire rate
* we should have a clearer distinction between locked and unlocked abilities
    * add different color for locked
* Fix the text on the upgrades to be less cluttered
    * suggestion: have a hover menu for each upgrade that has a longer desription of what it does and show the upgrade cost on that popup with the button to upgrade
* The "reset progress" button is to prominent. put it somewhere else. Maybe by the debug checkboxes?
* In a previous update we removed the "launch mission" button from the bottom of the screen next to reset progress
    * I think we want this back so there is a clearer call to action ot start the game back up again
    * I suggest we put a "Select Mission" button where the reset progress button is right now as an alternative place to click to start the mission but since there's a step before the mission launches, rename it to select
* add to-dos for creating the consumables system and the consumables themselves
* add a to-do for the "alternative missions" at each difficulty level
* add to-do to change the mission select from a text scroll to a graphic with hover-panels that have a description and the launch options. This could also be where we have the alternative versions of missions and discuss rewards
* Note that boss difficulty is too low. Not scaling up with difficulty of levels fast enough
* *Balance:* The burst shot is better than rapid with the same upgrades otherwise. I think the firing rate on rapid shot doesn't go up fast enough with upgrades so the burst ends up with more overall dps. This might be less relevant if homing is not as strong since right now the homing undoes the downside of having the shot spread a bit and makes every shot hit the target (especially during boss battles) 

### TODO (Deferred)
- Consumables system + consumable items.
- Alternative mission variants per difficulty tier.
- Mission select redesign: graphical cards with hover panels, rewards, and alt variants.
- Upgrade UI hover panels with full descriptions + purchase CTA (replace inline clutter).
- Evaluate music loop quality; swap tracks if any have noticeable loop seams.
