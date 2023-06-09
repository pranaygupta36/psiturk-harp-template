import numpy as np
import os
import shutil

# all_videos = os.listdir('./static/all_stimuli_videos/')

# for vid in all_videos:
#     img_file = vid.split('.')[0].replace('video', 'image') + '.png'
#     # print(img_file)
#     if os.path.exists('./static/all_stimuli_images/' + img_file) == False:
#         os.remove('./static/all_stimuli_videos/' + vid)
#         # print(vid)

all_images = os.listdir('./static/all_stimuli_images/')

print(all_images)
d = {}
for img in all_images:
    if "trial" not in img:
        num_vehicles = int(img.split("_")[1])
        if num_vehicles not in d:
            d[num_vehicles] = [img]
        else:
            d[num_vehicles].append(img)

for key in d:
    print(key, len(d[key]))
    if len(d[key]) > 100:
        selected_vids = np.random.choice(d[key], 100, replace=False)
        d[key] = selected_vids

for key in d:
    print(key, len(d[key]))

for key in d:
    for img in d[key]:
        vid_file = img.split('.')[0].replace('image', 'video') + '.webm'
        # print(vid_file)
        shutil.copyfile('./static/all_stimuli_images/' + img, './static/stimuli_images/' + img)
        shutil.copyfile('./static/all_stimuli_videos/' + vid_file, './static/stimuli_videos/' + vid_file)
        print(img, vid_file)
