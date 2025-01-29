import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText } from "lucide-react";
import { MainNav } from "@/components/NavigationMenu";

const Resources = () => {
  const videos = [
    {
      title: "Basic Guard Techniques",
      url: "https://youtu.be/example1",
      description: "Learn fundamental guard positions and transitions"
    },
    {
      title: "Submission Defense",
      url: "https://youtu.be/example2",
      description: "Essential defensive techniques for common submissions"
    }
  ];

  const documents = [
    {
      title: "BJJ Belt Requirements",
      description: "Detailed requirements for each belt level"
    },
    {
      title: "Competition Rules",
      description: "Official IBJJF competition rules and guidelines"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <MainNav />
      <h1 className="text-4xl font-bold mb-12 text-[#ea384c]">TRAINING RESOURCES</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#ea384c]">VIDEO LIBRARY</h2>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <Card key={index} className="bg-[#222222] border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="text-[#ea384c]" />
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{video.description}</p>
                  <Button 
                    className="mt-4 bg-[#ea384c] hover:bg-[#ea384c]/90"
                    onClick={() => window.open(video.url, "_blank")}
                  >
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#ea384c]">DOCUMENTS</h2>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <Card key={index} className="bg-[#222222] border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-[#ea384c]" />
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{doc.description}</p>
                  <Button 
                    className="mt-4 bg-[#ea384c] hover:bg-[#ea384c]/90"
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;