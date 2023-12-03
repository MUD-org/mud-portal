public class UserGameListing : GameListing {
  public bool IsOwner { get; set; }
  public bool IsAdmin { get; set; }
  public bool IsFavorited { get; set; }
  public bool InLibrary { get; set; }
}