import os

with open('./stimuli_list.txt', 'w') as f:
    f.write("[")
    for i in os.listdir('../static/stimuli_videos/'):
        if 'webm' in i and 'trial' not in i:
            img_name = i.split('.')[0].replace('video', 'image') + '.png'
            f.write("['"+ i +"' , '"+img_name+"' ], \n")
    f.write("]")
    f.close()

