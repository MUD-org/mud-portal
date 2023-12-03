using System.Collections.Generic;
using System.Linq;

public enum GameListingParamType {
  WebsiteUrl,
  Tag,
  ProfileImageUrl,
  BackgroundImageUrl
}

public class GameListingParam {
  public GameListingParamType ParamType { get; set; }
  public string Value { get; set; }
}

public class GameListingParams : List<GameListingParam> {
  public GameListingParam Get(GameListingParamType type) {
    return this.First(p => p.ParamType == type);
  }

  public GameListingParam[] GetAll(GameListingParamType type) {
    return this.Where(p => p.ParamType == type).ToArray();
  }

  /// <summary>
  /// Gets all values of ParamType <paramref name="type"/>. This is really useful for things like the Tag type,
  /// where there is any [n] number of those types but we really only care about their values.
  /// </summary>
  /// <param name="type">The type of param to fetch.</param>
  /// <returns>List of all values for type.</returns>
  public string[] GetAllValues(GameListingParamType type) {
    return GetAll(type).Select(p => p.Value).ToArray();
  }
}