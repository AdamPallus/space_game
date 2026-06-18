
I want to make some major changes to the underlying mechanics to the game.
All enemies and the player should have their hit points split between hull, armor and shields:
* Shields take damage first and recharge
* Armor has an armor class so damage taken = (damage-armor class) for each shot.
    * For example, if an enemy has armor class 10 but the players bullets do 8 damage each, the enemy won't take any damage
    * Another example, if the ship has armor class 10 but the player's bullets do 20 damage each, each bullet will reduce armor by (20-10=) 10.
    * Aesthetically, armor should only be used on slow moving ships
* Hull
    * Normal HP
    * Enemies blow up when hull HP <=0
* Enemy hit points should be shown whenever a player's bullets interact
    * Hull HP in Red
    * Armor in Dark Gray
    * Shields in light blue

Now we need to replace the player weapon upgrade system as follows:
See the attached "Ship Upgrades.png" for a visual diagram of the desired ship upgrade screen.
When the player clicks on these boxes it will bring up a sub-menu to let them customize the part
(Note: these numbers will need to be adjusted after testing and may need to be possible to upgrade)
* Weapons
    * Gun
	    * Gun Diameter - controls size of projectile and modifies velocity
            * Small/medium/large to start.
            * Ship starts with medium by default
		* Spread 
            * Focused 
                * shoots one projectile each interval straight ahead - call that 0 degrees
            * Burst
                * shoots 5 projectiles, each at 1/5th size, with random angle variations between +/- 5 degrees
            * Wide
                Shoots 5 projectiles each at 1/5th the size with angles 
		
	* Flow Controller- controls firing rate, modifies speed
		* Upgrade to Fire more rapidly (more shots per minute)
		* Upgrade to Fire at increased velocity 

	* Ammo/source (Open to better names for this) - 
		* Kinetic - damage modified by velocity. Better for small fast guns, but size also matters for damage
		* Plasma - Damage doesn't depend on velocity. Increase gun diameter for more damage
	* Special effects (Choose one of these)
		* Homing 
			* Upgrade the amount of homing
		* Explosive
			* Upgrade radius (modified by projectile size)
		* Piercing
			* Upgrade number of enemy ships the projectiles will go through
* Defenses
	* Hull
		* Fixed, can't be upgraded. Costs money to repair
		* Has slots to add armor or shields (start with a hull that has two of these but maybe we will have other ship options in the future for more than 2 defense slots)
	* Shields
		* Recharge after taking damage
		* Don't protect from collision damage
		* Can upgrade recharge rate (amount/s)
		* Can upgrade max amount (ie shield HP)
	* Armor
		* Protects hull from all damage (including collisions)
		* Has armor class
			* Damage taken = (damage - armor class)
		* Reduces firing rate
            * Need to experiment to find the amount  
		
