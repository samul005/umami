Add-Type -AssemblyName System.Drawing
$sourcePath = 'c:\Users\Aditya\Documents\antigravity\magical-davinci\Vistiq.png'
$publicDir = 'c:\Users\Aditya\Documents\antigravity\magical-davinci\vistiq\public'

function Resize-Image($src, $dest, $width, $height) {
    $bmp = [System.Drawing.Image]::FromFile($src)
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($newBmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($bmp, 0, 0, $width, $height)
    $newBmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $newBmp.Dispose()
    $bmp.Dispose()
}

Resize-Image $sourcePath (Join-Path $publicDir 'favicon-16x16.png') 16 16
Resize-Image $sourcePath (Join-Path $publicDir 'favicon-32x32.png') 32 32
Resize-Image $sourcePath (Join-Path $publicDir 'apple-touch-icon.png') 180 180
Resize-Image $sourcePath (Join-Path $publicDir 'android-chrome-192x192.png') 192 192
Resize-Image $sourcePath (Join-Path $publicDir 'android-chrome-512x512.png') 512 512
Resize-Image $sourcePath (Join-Path $publicDir 'mstile-150x150.png') 150 150
Resize-Image $sourcePath (Join-Path $publicDir 'logo.png') 512 512
Copy-Item $sourcePath (Join-Path $publicDir 'vistiq-icon.png') -Force

# Create favicon.ico from 32x32
$iconBmp = [System.Drawing.Image]::FromFile((Join-Path $publicDir 'favicon-32x32.png'))
$icon = [System.Drawing.Icon]::FromHandle($iconBmp.GetHicon())
$fileStream = New-Object System.IO.FileStream((Join-Path $publicDir 'favicon.ico'), [System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()
$iconBmp.Dispose()

Write-Output 'Generated all Vistiq public image assets successfully'
