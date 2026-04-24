import Foundation
import Vision
import AppKit

let imagePath = "public/hero-banner.png"
guard let image = NSImage(contentsOfFile: imagePath),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Could not load image")
    exit(1)
}

let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for observation in observations {
        guard let topCandidate = observation.topCandidates(1).first else { continue }
        let text = topCandidate.string
        if text.lowercased().contains("manual") || text.lowercased().contains("zona") || text.lowercased().contains("te") || text.lowercased().contains("presentamos") {
            print("Found text: \(text)")
            print("Bounding box: \(observation.boundingBox)")
        }
    }
}

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
do {
    try handler.perform([request])
} catch {
    print(error)
}
