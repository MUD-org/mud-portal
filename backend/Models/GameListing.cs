public class GameListing {
  public int Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }

  public GameListingParams Params { get; set;}

  public string Host { get; set; }
  public ushort Port { get; set; }

  public GameListing() {
    Params = new GameListingParams();
  }
}