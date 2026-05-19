export default class Collision {
  
  static check(player, enemy) {
    let pad = 30;
    if (
      player.x + player.width - pad> enemy.x + pad &&
      player.x  + pad < enemy.x + enemy.sizeWidth - pad &&
      player.y +player.height> enemy.y + pad &&
      player.y + pad < enemy.y + enemy.sizeHeight - pad 
    ) {
      return true; 
    } 
    return false;
  }
}