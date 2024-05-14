using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DateTimeConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.Parse(reader.GetString());
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(
            value.ToUniversalTime()
            // year-Month-day'T'Hour:minutes:seconds'Z'
            // 2020-02-03T:14:05:05Z
                .ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"));
    }
}