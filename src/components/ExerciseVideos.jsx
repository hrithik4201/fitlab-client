import React from "react";
import { ExternalLink, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "./Loader";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <div className="mt-20 lg:mt-[103px] p-5">
      <h2 className="text-2xl lg:text-[44px] font-bold text-black mb-8">
        Watch <span className="text-[#FF2625] capitalize">{name}</span> exercise
        videos
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[110px] flex-wrap items-start">
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <Card
            key={index}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden max-w-sm"
          >
            <a
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  className="w-full h-48 object-cover rounded-t-[20px] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-[#FF2625]" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 rounded-full p-2">
                  <ExternalLink className="h-4 w-4 text-white" />
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg lg:text-[28px] font-semibold text-black mb-2 line-clamp-2 group-hover:text-[#FF2625] transition-colors">
                  {item.video.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.video.channelName}
                </p>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;
