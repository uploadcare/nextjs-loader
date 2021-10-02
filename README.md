# Uploadcare custom loader (and more) for Next.js

**Please note the project is in active development and it's not ready for production just yet.**

### Settings

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY="YOUR_PUBLIC_KEY"
# Coma-separated list of API parameters.
NEXT_PUBLIC_API_PARAMETERS="format/auto, stretch/off, progressive/yes"
```

Default API parameters are:
 - format/auto 
 - stretch/off 
 - progressive/yes 
 - resize/[width]x 
 - quality/[quality]

All of these parameters can we overridden by setting NEXT_PUBLIC_API_PARAMETERS.

See [Uploadcare Compression documentation](https://uploadcare.com/docs/transformations/image/compression/) for reference.
